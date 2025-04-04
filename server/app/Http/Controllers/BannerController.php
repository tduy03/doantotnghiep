<?php

namespace App\Http\Controllers;

use App\Http\Requests\BannerRequest;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banner=Banner::all();
        return view('Admin.Banners.index',compact('banner'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.Banners.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BannerRequest $request)
    {
        if ($request->isMethod('POST')) {
            // dd($request->hinh_anh);
            $param = $request->except('_token');
           $user_id = Auth::id();
        //    dd($user_id);
           $param['user_id'] = $user_id;
            if ($request->hasFile('image')) {
                $filePath = $request->file('image')->store('uploads/banners', 'public');

            } else {
                $filePath = null;
            }
            $param['image'] = $filePath;
            // dd($param);
            Banner::query()->create($param);
            return redirect()->route('admins.banner.index')->with('success', 'Thêm banner thành công');
            // php artisan storage:lin sau khi xong thì chạy lệnh kia để tạo thư mục 
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
       
        $banner = Banner::findOrFail($id);
        return view('Admin.Banners.edit', compact('banner'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if ($request->isMethod('PUT')) {
            $param = $request->except('_token', '_method');
            $banner = Banner::findOrFail($id);
          
            if ($request->hasFile('image')) {
                if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                    Storage::disk('public')->delete($banner->image);
                }
                $filePath = $request->file('image')->store('uploads/banners', 'public');
            } else {
                $filePath = $banner->image;
            }
            
            $param['image'] = $filePath;
            $banner->update($param);
        
            return redirect()->route('admins.banner.index')->with('success', 'Cập nhật banner thành công');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();
        if ($banner->image && Storage::disk('public')->exists($banner->image)) {
            Storage::disk('public')->delete($banner->image);
        }
        return redirect()->route('admins.banner.index')->with('success', 'Xóa banner thành công');
    }
}
