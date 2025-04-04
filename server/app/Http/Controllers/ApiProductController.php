<?php

namespace App\Http\Controllers;

use App\Mail\ContasUsMail;
use App\Models\Banner;
use App\Models\Comment;
use App\Models\Product;
use App\Models\Promotion;
use App\Models\ProductColor;
use App\Models\SubCategory;
use App\Models\ProductSize;
use App\Models\Shipping;
use App\Models\Discount;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;


class ApiProductController extends Controller
{
    public function productDetail(string $id, string $sub_category_id)
    {
        $product = Product::query()->with('discount')->findOrFail($id);
        if (!$product) {
            return response()->json([
                'message' => 'không có sản phẩm',
            ], 404);
        }
        // số lượng sản phẩm ở trong productDetail
        $stock = $product->ProductDetail->Sum('quantity');
        $product['stock'] = $stock;
        // số lượng sản phẩm đã bán
        $soldQuantity = $product->ProductDetail->flatMap(function ($productDetail) {
            return $productDetail->orderDetail->pluck('quantity');
        })->sum();
        $product['soldQuantity'] = $soldQuantity;
        $product->imageUrl = 'http://127.0.0.1:8000/storage/' . $product->image;
        $subCategory = SubCategory::query()->where('id', $sub_category_id)->first();
        $productSubCategory = $subCategory ? $subCategory->product()->with('discount')->get() : [];
        foreach ($productSubCategory as $key => $productSubCategorys) {
            $productSubCategorys->imageUrl = 'http://127.0.0.1:8000/storage/' . $productSubCategorys->image;
        }
        $product->increment('view');
        $product->images;

        $comments = Comment::where('product_id', $id)
        ->whereNull('parent_id')
        ->with(['user:id,name', 'replies' => function ($query) {
            $query->with('user:id,name');  // Load thông tin người dùng cho phản hồi
        }])
        ->get();

            $startComment = Comment::where('product_id', $id)->whereNull('parent_id')->count();
            $totalComment = Comment::where('product_id', $id)->whereNull('parent_id')->get();
            $sumTotalComment = $totalComment->sum('rating');
            if($startComment !=0){
                $avgComment = $sumTotalComment / $startComment;

            }




        return response()->json([
            'Product' => $product,
            'ProductSubCategory' => $productSubCategory,
            'comments' => $comments,
            'avgComment' => $avgComment ?? 0,
            'startComment'=>$startComment ?? 0,
        ], 200);

    }



    public function promotion()
    {
        $promotion = Promotion::query()->whereNotNull('minimum_spend')->get();
        $data = [
            'status' => 'success',
            'data' => $promotion,
        ];
        return response()->json($data);
    }
    public function subcategory()
    {
        $category = SubCategory::all();
        $data = [
            'status' => 'success',
            'data' => $category,
        ];
        return response()->json($data);
    }
    public function color()
    {
        $productColor = ProductColor::all();
        return response()->json([
            'productColor' => $productColor,
        ]);
    }
    public function size()
    {
        $productSize = ProductSize::all();
        return response()->json([
            'productSize' => $productSize,
        ]);

    }


    public function Shipping()
    {
        $Shipping = Shipping::all();
        $data = [
            'status' => 'success',
            'data' => $Shipping,
        ];
        return response()->json($data);
    }

    public function Banner()
    {

        $banner = Banner::all();
        $data = [
            'status' => 'success',
            'data' => $banner,
        ];
        return response()->json($data);
    }
    public function contasUs(Request $request)
    {
        $yourEmail = config('mail.from.address');
        $email = $request->email;
        $name = $request->name;
        $phone = $request->phone;
        $note = $request->note;

        try {
            Mail::to($yourEmail)->send(new ContasUsMail($yourEmail, $email, $name, $phone, $note));
            return response()->json(['message' => 'Gửi contact thành công']);
        } catch (\Throwable $th) {
            Log::error('Error sending email: ' . $th->getMessage());
            return response()->json(['message' => 'Gửi contact thất bại']);
        }
    }
    public function discount()
    {

        $discount = discount::all();
        $data = [
            'status' => 'success',
            'data' => $discount,
        ];
        return response()->json($data);
    }

    public function subcateProduct(string $id)
    {
        $subcate = SubCategory::findOrFail($id);
        $productcate = $subcate->product;
        if ($productcate) {
            return response()->json([
                'message' => 'thành công',
                'productcate' => $productcate
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không có sản phẩm',

            ], 404);
        }

    }

    public function cateProduct(string $id)
    {
        $category = Category::findOrFail($id);
        $subcategory_ids = $category->subCategories->pluck('id');
        // return response()->json([
        //     'message' => 'thành công',
        //     'CateProduct'=>$subcategory_ids
        // ],200);
        $CateProduct = Product::query()->whereIn('sub_category_id', $subcategory_ids)->get();
        if ($CateProduct) {
            return response()->json([
                'message' => 'thành công',
                'CateProduct' => $CateProduct
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không có sản phẩm',

            ], 404);
        }

    }
    public function ProdductOrder($id){
        $product = Product::query()->select('name','image','price')->where('id',$id)->first();

    if($product){
        return response()->json(['product'=>$product],200);
    }else{
        return response()->json(['error'=>'khong tim thay san pham'],404);
    }


    }


}
