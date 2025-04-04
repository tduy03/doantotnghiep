<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductView;
use App\Models\SubCategory;

use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::query()
            ->where('is_active', '1')
            ->with('discount')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        // ->paginate(5)
        $products_sale = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
            ->where('is_active', '1')
            ->where('is_sale', '1')
            ->with('discount')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        foreach ($products_sale as $products_sales) {
            $products_sales->imageUrl = 'http://127.0.0.1:8000/storage/' . $products_sales->image;
        }
        $products_showhome = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
            ->where('is_active', '1')
            ->where('is_show_home', '1')
            ->with('discount')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        foreach ($products_showhome as $products_showhomes) {
            $products_showhomes->imageUrl = 'http://127.0.0.1:8000/storage/' . $products_showhomes->image;
        }
        $products_hot = Product::query()
            ->select('id', 'image', 'name', 'price', 'sub_category_id', 'price_sale', 'discount_id')
            ->where('is_active', '1')
            ->where('is_hot', '1')
            ->with('discount')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();
        foreach ($products_hot as $products_hots) {
            $products_hots->imageUrl = 'http://127.0.0.1:8000/storage/' . $products_hots->image;
        }
        $data = [
            'status' => 'success',
            'products' => $products,
            'products_sale' => $products_sale,
            'products_hot' => $products_hot,
            'products_showhome' => $products_showhome,
        ];
        $discounts = Discount::with('subCategory')->orderBy('created_at', 'desc')->get();
        $sub_category_ids = $discounts->pluck('sub_category_id');
        $products = Product::query()->whereIn('sub_category_id', $sub_category_ids)->get();
        foreach ($products as $product) {
            $discount = $discounts->firstWhere('sub_category_id', $product->sub_category_id);

            if ($discount) {
                $now = Carbon::now('Asia/Ho_Chi_Minh');
                $expires_at = Carbon::parse($discount->expires_at);
                foreach ($discounts as $key => $value) {
                    if ($now->lessThan($expires_at)) {
                        $sale = $product->price * $value->discount_percent / 100;
                        $product->discount_id = $discount->id;
                        $product->price_sale = $product->price - $sale;
                    } else {
                        $product->discount_id = null;
                        $product->price_sale = null;
                        $product->is_sale = 0;
                    }
                }
            } else {
                $product->discount_id = null;
                $product->price_sale = null;
            }
            $saved = $product->save();
        }

        return response()->json($data);
    }


    public function search(Request $request)
    {
        $query = $request->input('q', '');

        // Thêm logic tìm kiếm sản phẩm của bạn
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->orWhereRaw('CAST(price AS CHAR) like ?', ['%' . $query . '%'])
            ->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return response()->json($products);
    }


    public function getProductsByCategory($name)
    {
        // Tìm category theo name
        $category = Category::where('name', $name)->first();


        if (!$category) {
            return response()->json(['message' => 'Không tìm thấy danh mục sản phẩm'], 404);
        }

        // Lấy tất cả các sản phẩm thông qua các sub-category của category này
        $products = $category->products()->get();

        // Kiểm tra nếu không có sản phẩm nào trong danh mục
        if ($products->isEmpty()) {
            return response()->json(['message' => 'Không có sản phẩm nào trong danh mục này'], 404);
        }

        // Trả về danh sách sản phẩm nếu có
        return response()->json($products);
    }

    public function filter(Request $request)
    {

        $color_id = $request->input('color_id');
        $size_id = $request->input('size_id');
        $query = ProductDetail::query();
        if ($color_id) {
            $query->where('color_id', $color_id);
        }

        if ($size_id) {
            $query->where('size_id', $size_id);
        }
        $products = $query->with(['product', 'productColor', 'productSize'])->get();
        if ($products->isNotEmpty()) {
            return response()->json([
                'message' => 'Đã tìm thấy sản phẩm',
                'products' => $products,
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm',
            ], 404);
        }
    }
    public function filterByPrice(Request $request)
    {
        $min_price = $request->input('min_price');
        $max_price = $request->input('max_price');
        $productPrice = Product::query()->whereBetween('price', [$min_price, $max_price])->get();
        if ($productPrice->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm',
            ], 404);
        } else {
            return response()->json([
                'message' => 'Đã tìm thấy sản phẩm',
                'productPrice' => $productPrice,
            ], 200);
        }
    }


    // Sản phẩm đã xem gần đây
    public function addRecentlyViewed(Request $request)
    {
        $user = $request->user(); // Lấy người dùng hiện tại
        if (!$user) {
            return response()->json([
                'message' => 'Bạn chưa đăng nhập vui lòng đăng nhập'
            ], 404);
        }
        $productId = $request->input('product_id');
        if (!$productId) {
            return response()->json([
                'message' => 'Bạn chưa có sản phẩm xem gần đây'
            ], 404);
        }


        // Kiểm tra sản phẩm có tồn tại không
        $product = Product::find($productId);
        if (!$product) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 404);
        }
        // $user = $request->user();
        // if (!$user) {
        //     return response()->json(['error' => 'Người dùng không xác định'], 401);
        // }

        // Xóa bản ghi cũ nếu sản phẩm này đã có trong danh sách
        ProductView::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->delete();

        // Tạo bản ghi mới
        ProductView::create([
            'user_id' => $user->id,
            'product_id' => $productId,
        ]);

        // Giới hạn danh sách sản phẩm đã xem gần đây (ví dụ: chỉ giữ lại 5 sản phẩm gần nhất)
        $recentlyViewed = ProductView::where('user_id', $user->id)
            ->orderBy('viewed_at', 'desc')
            ->take(5)
            ->pluck('id');

        // Xóa các sản phẩm cũ hơn ngoài giới hạn
        ProductView::where('user_id', $user->id)
            ->whereNotIn('id', $recentlyViewed)
            ->delete();

        return response()->json(['message' => 'Đã thêm vào danh sách đã xem gần đây']);
    }

    // Hàm để lấy danh sách sản phẩm đã xem gần đây
    public function getRecentlyViewed(Request $request)
    {
        $user = $request->user(); // Lấy người dùng hiện tại
        if (!$user) {
            return response()->json([
                'message' => 'Bạn chưa đăng nhập vui lòng đăng nhập'
            ]);
        }

        $request->validate([
            'product' => 'required'
        ]);
        // Lấy danh sách sản phẩm đã xem gần đây của người dùng
        $products = ProductView::where('user_id', $user->id)
            ->orderBy('viewed_at', 'desc')
            ->take(5) // Lấy 5 sản phẩm gần nhất
            ->with('product') // Eager load chi tiết sản phẩm
            ->get();

        return response()->json($products);
    }

    public function filterProduct(Request $request)
    {
        $query = Product::query()
            ->select('products.*')
            ->distinct()
            ->join('product_details', 'products.id', '=', 'product_details.product_id');

        if ($request->filled('category')) {
            $category = Category::where('id', $request->category)->first();
            if ($category) {
                $subcategory_ids = $category->subCategories->pluck('id')->toArray();
                $query->whereIn('products.sub_category_id', $subcategory_ids);
            } else {
                return response()->json([
                    'message' => 'Danh mục không tồn tại!'
                ], 400);
            }
        }

        if ($request->filled('subcate')) {
            $subcate = SubCategory::where('id',  $request->subcate)->first();
            if ($subcate) {
                $query->where('products.sub_category_id', $subcate->id);
            } else {
                return response()->json([
                    'message' => 'Danh mục con không tồn tại!'
                ], 400);
            }
        }

        if ($request->filled('color_id')) {
            $color_ids = explode(',', $request->color_id);
            $query->whereIn('product_details.color_id', $color_ids);
        }

        if ($request->filled('size_id')) {
            $size_ids = explode(',', $request->size_id);
            $query->whereIn('product_details.size_id', $size_ids);
        }

        if ($request->filled('min_price') || $request->filled('max_price')) {
            $min_price = $request->min_price ?? 0;
            $max_price = $request->max_price ?? 9999999;
            $query->where(function ($q) use ($min_price, $max_price) {
                $q->where(function ($q2) use ($min_price, $max_price) {
                    $q2->whereNotNull('products.price_sale')
                        ->whereBetween('products.price_sale', [$min_price, $max_price]);
                })
                ->orWhere(function ($q3) use ($min_price, $max_price) {
                    $q3->whereNull('products.price_sale')
                        ->whereBetween('products.price', [$min_price, $max_price]);
                });
            });
        }

        $products = $query->paginate(10);

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có sản phẩm phù hợp'
            ], 200);
        }

        return response()->json([
            'message' => 'Lọc thành công',
            'products' => $products
        ], 200);
    }

}
