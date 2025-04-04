<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $subcategory = SubCategory::with('category')->get(); // Load quan hệ category
    $category_id = Category::all(); // Lấy danh sách tất cả danh mục

    return view('Admin.SubCategory.index', compact('subcategory', 'category_id'));
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $category_id = Category::all();
        return view('Admin.SubCategory.create',compact('category_id'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubCategoryRequest $request)
    {
        $data = $request->except('image');
    
        if ($request->hasFile('image')) {
            $filePath = $request->file('image')->store('uploads/subcategory', 'public');

        } else {
            $filePath = null;
        }
        $data['image'] = $filePath;
        SubCategory::query()->create($data);
        return redirect()->route('admins.subcategory.index')->with('success','Thêm danh mục thành công');
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
        $model = SubCategory::find($id);
        $category_id = Category::all();
        return view('Admin.SubCategory.update',compact('model','category_id'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubCategoryRequest $request, string $id)
    {
        // Lấy thông tin của SubCategory theo id
        $subcategory = SubCategory::findOrFail($id);
    
        // Lấy dữ liệu từ request, trừ file hình ảnh
        $data = $request->except('image');
    
        // Kiểm tra nếu có file hình ảnh mới trong request
        if ($request->hasFile('image')) {
            // Lưu hình ảnh mới
            $filePath = $request->file('image')->store('uploads/subcategory', 'public');
    
            // Xóa hình ảnh cũ nếu tồn tại
            if ($subcategory->image && Storage::disk('public')->exists($subcategory->image)) {
                Storage::disk('public')->delete($subcategory->image);
            }
    
            // Gán đường dẫn file mới vào dữ liệu cập nhật
            $data['image'] = $filePath;
        } else {
            // Nếu không có hình ảnh mới, giữ nguyên hình ảnh cũ
            $data['image'] = $subcategory->image;
        }
    
        // Cập nhật thông tin SubCategory
        $subcategory->update($data);
    
        // Chuyển hướng lại trang danh sách với thông báo thành công
        return redirect()->route('admins.subcategory.index')->with('success', 'Cập nhật danh mục thành công');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = SubCategory::find($id);
        if($model->image && file_exists($model->image)){
            unlink($model->image);
        }
        if($model->delete()){
            return back()->with('success','Xóa danh mục thành công');
        }
    }
    
}
