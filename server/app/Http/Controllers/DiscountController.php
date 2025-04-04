<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Discount;
use Illuminate\Support\Facades\DB;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
                        $sale = $product->price *$value->discount_percent / 100;
                        $product->discount_id = $discount->id;
                        $product->price_sale = $product->price - $sale;
                        $product->is_sale=1;
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
        return view('Admin.Discount.index', compact('discounts'));
    }






    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = SubCategory::all();
        return view('Admin.Discount.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'sub_category_id' => 'required|integer',
            'discount_percent' => 'required|numeric|min:0|max:100',
            'is_active' => 'required|boolean',
            'expires_at' => 'required|date',
        ]);

        // Tạo bản ghi discount mới với các trường cụ thể
        Discount::create($request->only(['sub_category_id', 'discount_percent', 'is_active', 'expires_at']));




        return redirect()->route('admins.discounts.index')->with('success', 'Thêm giảm giá thành công');
    }

    /**
     * Apply discount to related products.
     */



    public function edit(string $id)
    {
        $discount = Discount::findOrFail($id);
        $categories = SubCategory::all(); // Lấy tất cả các danh mục
        return view('Admin.Discount.edit', compact('discount', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'sub_category_id' => 'integer',
            'discount_percent' => 'numeric|min:0|max:100',
            'is_active' => 'boolean',
        ]);

        $discount = Discount::findOrFail($id);
        $discount->update($request->all());

        return redirect()->route('admins.discounts.index')->with('success', 'Cập nhật giảm giá thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $discount = Discount::findOrFail($id);
        $discount->delete();
        return redirect()->route('admins.discounts.index')->with('success', 'Xóa giảm giá thành công');
    }
    public function discount()
    {

        $discount = Discount::all();
        $data = [
            'status' => 'success',
            'data' => $discount,
        ];
        return response()->json($data);
    }
}
