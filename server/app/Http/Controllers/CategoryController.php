<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();
        // dd($category);
        return view('Admin.Category.index', compact('category'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.Category.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        if ($request->isMethod('POST')) {
            $category_id = Category::max('id') ?? 0;
            $param = $request->except('_token');
            $slug = $param['name'] . '-' . $category_id . '-' . $param['name'];
            $param['slug'] = $slug;
            Category::query()->create($param);
            return redirect()->route('admins.category.index')->with('success', 'Thêm danh mục thành công');
            // return redirect()->route('admins.category.index')->with('success', 'Thêm danh mục thành công');

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
        $category = Category::query()->findOrFail($id);
        return view('Admin.Category.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = Category::query()->findOrFail($id);
        if ($request->isMethod('PUT')) {

            $param = $request->except('_token');
            $category->update($param);
            return redirect()->route('admins.category.index')->with('success', 'Sửa danh mục thành công');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->subCategories()->delete();
        // $category->discounts()->delete();
        $category->delete();
        return redirect()->route('admins.category.index')->with('success', 'Xóa danh mục thành công');
    }
}
