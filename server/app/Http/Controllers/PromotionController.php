<?php

namespace App\Http\Controllers;

use App\Http\Requests\PromotionRequest;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promotion = Promotion::all();

        return view('Admin.Promotion.index',compact('promotion'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('Admin.Promotion.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PromotionRequest $request)
    {
        // if($request->discount_type['percentage']>100){

        // }
        Promotion::create($request->all());

        return redirect()->route('admins.promotion.index')->with('success', 'Thêm khuyễn mãi thành công');
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
        $model = Promotion::find($id);
        return view('Admin.Promotion.update',compact('model'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->update($request->all());

        return redirect()->route('admins.promotion.index')->with('success', 'Cập nhật mã khuyến mãi thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->delete();
        return back()->with('success', 'Xóa mã khuyến mãi thành công');
    }
}
