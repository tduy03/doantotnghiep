<?php

namespace App\Http\Controllers;

use App\Models\ProductColor;
use Illuminate\Http\Request;

class ProductColorController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productcolor = productcolor::all();
        return view('Admin.ProductColor.index',compact('productcolor'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.productcolor.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|string|max:255',
            'color_code'=> 'required'
        ]);
        ProductColor::create($request->all());
        return redirect()->route('admins.product_colors.index')->with('success','Thêm màu sản phẩm thành công');
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
        $productcolors = ProductColor::findOrFail($id);
        return view('Admin.productcolor.edit',compact('productcolors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $productcolor = ProductColor::findOrFail($id);
        $productcolor->update($request->all());

        return redirect()->route('admins.product_colors.index')
            ->with('success', 'Sửa màu sản phẩm thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productcolor = ProductColor::findOrFail($id);
        $productcolor->delete();
    
    return redirect()->route('admins.product_colors.index')
        ->with('success', 'Xóa màu sản phẩm thành công');
    }
}
