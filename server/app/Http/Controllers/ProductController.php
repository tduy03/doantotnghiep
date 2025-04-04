<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\ProductStoreRequest;
use App\Http\Requests\Product\ProductUpdateRequets;
use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductDetail;
use App\Models\ProductSize;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $Product = Product::query()->orderBy('id', 'desc')->get();
        // $Productname = $Product->SubCate->name;
        // dd($Product);

        return view('Admin.Product.index', compact('Product'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subcategory = SubCategory::all();
        $categories = Category::all();
        $color = ProductColor::all();
        $size = ProductSize::all();
        return view('Admin.Product.create', compact('subcategory', 'categories', 'color', 'size'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {

        $category = Category::query()->orderBy('id', 'desc')->first();
        $category_id = $category->id;

        DB::beginTransaction();

        try {
            $params = $request->except('_token');
            $params['is_sale'] = $request->has('is_sale') ? 1 : 0;
            $params['is_hot'] = $request->has('is_hot') ? 1 : 0;
            $params['is_show_home'] = $request->has('is_show_home') ? 1 : 0;
            $params['is_active'] = $request->has('is_active') ? 1 : 0;

            $productName = $request->name;
            $slugName = Str::slug($productName, '-');
            $params['product_code'] = $slugName . '-' . $category_id . '-' . Str::random(3);
            $params['view']=0;
            // Lưu hình ảnh chính
            $params['image'] = $request->file('image')->store('uploads/products', 'public');
            $product = Product::create($params);
            $product_id = $product->id;

            // Xử lý hình ảnh bổ sung
            if ($request->hasFile('list_hinh_anh')) {
                foreach ($request->file('list_hinh_anh') as $image) {
                    if ($image) {
                        $path = $image->store('uploads/products/id_' . $product_id, 'public');
                        $product->images()->create([
                            'product_image_id' => $product_id,
                            'image' => $path
                        ]);
                    }
                }
            }

            $products = $request->input('products');
        $combinations = []; // Mảng lưu các tổ hợp size_id và color_id

        foreach ($products as $productVariant) {
            $combination = $productVariant['size_id'] . '-' . $productVariant['color_id'];

            // Kiểm tra trùng lặp trong danh sách biến thể
            if (in_array($combination, $combinations)) {
                return redirect()->route('admins.product.create')->with('error', 'Danh sách sản phẩm có kích cỡ và màu sắc bị trùng lặp.');
            }

            // Thêm tổ hợp vào danh sách đã kiểm tra
            $combinations[] = $combination;

            // Kiểm tra trùng lặp với dữ liệu đã có trong database
            $existingVariant = ProductDetail::where('product_id', $product_id)
                                            ->where('size_id', $productVariant['size_id'])
                                            ->where('color_id', $productVariant['color_id'])
                                            ->first();

            if ($existingVariant) {
                return redirect()->route('admins.product.create')->with('error', 'Biến thể đã tồn tại trong hệ thống.');
            }

            // Thêm biến thể sản phẩm vào database
            $product->ProductDetail()->create([
                'product_id' => $product_id,
                'size_id' => $productVariant['size_id'],
                'color_id' => $productVariant['color_id'],
                'quantity' => $productVariant['quantity'],
            ]);
            }

            DB::commit();
            return redirect()->route('admins.product.index')->with('success', 'Thêm sản phẩm thành công');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            return redirect()->route('admins.product.create')->with('error', 'Đã xảy ra lỗi: ' . $e->getMessage());
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $subcategory = SubCategory::all();
        $categories = Category::all();
        $color = ProductColor::all();
        $size = ProductSize::all();

        $categories = Category::all();

        // $productDetai = $product->ProductDetail;
        // = $product->images;

        // dd($product, $subcategory, $color, $size,$productDetai,$images);

        return view('Admin.Product.edit', compact('product', 'subcategory', 'color', 'size', 'categories'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        // dd($request->all());
        $product = Product::findOrFail($id);
        $product_id = $product->id;
        if ($request->isMethod('PUT')) {
            // try {
            $params = $request->except('_token', '_method');
            $params['is_sale'] = $request->has('is_sale') ? 1 : 0;
            $params['is_hot'] = $request->has('is_hot') ? 1 : 0;
            $params['is_show_home'] = $request->has('is_show_home') ? 1 : 0;
            $params['is_active'] = $request->has('is_active') ? 1 : 0;
            if ($request->hasFile('image')) {
                if ($product->image && Storage::disk('public')->exists($product->image)) {
                    Storage::disk('public')->delete($product->image);
                }
                $params['image'] = $request->file('image')->store('uploads/products', 'public');
            } else {
                $product['image'] = $product->image;
            }
            // sử lí nhiều ảnh sản phẩm
            $currentImage = $product->images->pluck('id')->toArray();
            $arrCombine = array_combine($currentImage, $currentImage);
            // dd($arrCombine);
            if (is_array($request->list_hinh_anh)) {
                foreach ($arrCombine as $key => $value) {
                    // rồi kiểm tra mảng đó xem có ở request không nếu thiếu cái nào thì xóa cái đó đi (ở reequest có 2,3 mà ở database có 2,3,4 thì xóa 4)
                    if (!in_array($key, array_keys($request->list_hinh_anh))) {
                        $images = Image::query()->find($key);
                        if ($images && Storage::disk('public')->exists($images->image)) {
                            Storage::disk('public')->delete($images->image);
                            $images->delete();
                        }
                    }
                }
                // Trường hợp thêm hoặc sửa ảnh
                foreach ($request->list_hinh_anh as $key => $image) {
                    // Nếu là ảnh mới được thêm vào
                    if (!array_key_exists($key, $arrCombine)) {
                        if ($request->hasFile("list_hinh_anh.$key")) {
                            $path = $image->store('uploads/products/id_' . $product_id, 'public');
                            $product->images()->create([
                                'product_image_id' => $product_id,
                                'image' => $path
                            ]);
                        }
                    }
                    // Trường hợp thay đổi hình ảnh cũ
                    else if (is_file($image) && $request->hasFile("list_hinh_anh.$key")) {
                        $images = Image::query()->find($key);
                        if ($images && Storage::disk('public')->exists($images->image)) {
                            Storage::disk('public')->delete($images->image);
                        }
                        $path = $image->store('uploads/products/id_' . $product_id, 'public');
                        $images->update([
                            'image' => $path,
                        ]);
                    }
                }
            } else {
                // Nếu không có thay đổi gì trong danh sách hình ảnh, giữ nguyên hình ảnh cũ
                $params['images'] = $product->images;
            }
            // Xử lý ProductDetail
            $products = $request->input('products');
            $existingVariants = []; // Mảng kiểm tra trùng lặp
            $errors = []; // Mảng lỗi

            if ($products) {
                $ProductDetailArrray = $product->ProductDetail->pluck('id')->toArray();
                $arrCombineProductDetail = array_combine($ProductDetailArrray, $ProductDetailArrray);

                foreach ($arrCombineProductDetail as $keys => $arrCombineProductDetails) {
                    if (!in_array($keys, array_keys($products))) {
                        $ProductDetail = ProductDetail::query()->find($keys);
                        $ProductDetail->delete();
                    }
                }

                foreach ($products as $key => $value) {
                    $variantKey = $value['color_id'] . '-' . $value['size_id'];
                    if (isset($existingVariants[$variantKey])) {
                        $errors[] = "Biến thể trùng lặp: Màu sắc {$value['color_id']} và kích thước {$value['size_id']} đã tồn tại.";
                    } else {
                        $existingVariants[$variantKey] = true;
                    }

                    if (!array_key_exists($key, $arrCombineProductDetail)) {
                        $product->ProductDetail()->create([
                            'product_id' => $product_id,
                            'size_id' => $value['size_id'],
                            'color_id' => $value['color_id'],
                            'quantity' => $value['quantity'],
                        ]);
                    } else if ($request->has("products.$key")) {
                        ProductDetail::query()->where('id', $key)->update([
                            'size_id' => $value['size_id'],
                            'color_id' => $value['color_id'],
                            'quantity' => $value['quantity'],
                        ]);
                    }
                }
            }

            if (!empty($errors)) {
                return redirect()->back()->withErrors(['products' => $errors])->withInput();
            }

            $product->update($params);

            return redirect()->route('admins.product.index')->with('success', 'Sửa sản phẩm thành công');
            // } catch (\Exception $e) {
            //     DB::rollBack();
            //     return redirect()->back()->withErrors(['error' => 'Cập nhật thất bại']);
            // }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Tìm sản phẩm theo id, nếu không có trả lỗi 404
        $product = Product::findOrFail($id);

        // Xóa từng hình ảnh của sản phẩm
        foreach ($product->images as $image) {  // $product->images nếu là một collection
            if ($image && Storage::disk('public')->exists($image->image)) {
                Storage::disk('public')->delete($image->image); // Xóa hình ảnh từ storage
            }
            $image->delete(); // Xóa bản ghi hình ảnh trong database
        }

        // Xóa thư mục chứa hình ảnh của sản phẩm
        $path = 'uploads/products/id_' . $id;
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->deleteDirectory($path); // Xóa toàn bộ thư mục
        }

        // Xóa tất cả các biến thể của sản phẩm
        foreach ($product->ProductDetail as $ProductDetail) {
            $ProductDetail->delete(); // Xóa biến thể sản phẩm
        }

        // Xóa sản phẩm chính
        $product->delete();

        return redirect()->route('admins.product.index')->with('success', 'Xóa sản phẩm thành công');
    }

}
