<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductSize;

class ProductSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productSize = ProductSize::all();
        return view('Admin.ProductSize.index',compact('productSize'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.ProductSize.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|string|max:255',
        ]);
        ProductSize::create($request->all());
        return redirect()->route('admins.product_sizes.index')->with('success','Thêm size mới thành công');
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
        $productSizess = ProductSize::findOrFail($id);
        return view('Admin.ProductSize.edit',compact('productSizess'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $productSize = ProductSize::findOrFail($id);
        $productSize->update($request->all());

        return redirect()->route('admins.product_sizes.index')
            ->with('success', 'Cập nhật kích size thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $productSize = ProductSize::findOrFail($id);
        $productSize->delete();
    
    return redirect()->route('admins.product_sizes.index')
        ->with('success', 'Xóa size thành công');
    }
}
