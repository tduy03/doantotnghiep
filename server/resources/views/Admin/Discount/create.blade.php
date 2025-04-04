@extends('Layout.master')
@section('title')
    thêm danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Thêm mới mã giảm giá </h5>
                </div><!-- end card header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.discounts.store') }}" method="POST">
                                @csrf
                        
                                <div class="col-6">
                                    <label for="sub_category_id" class="mt-2">Danh mục</label>
                                    <select id="sub_category_id" name="sub_category_id" class="form-control">
                                        <option value="" disabled selected>Chọn danh mục</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">{{ $category->name }}</option>
                                        @endforeach
                                    </select>
                                    @error('sub_category_id')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                        
                                <div class="col-6">
                                    <label for="discount_percent" class="mt-2">Phần trăm giảm giá</label>
                                    <input type="number" id="discount_percent" name="discount_percent" step="0.01" class="form-control">
                                    @error('discount_percent')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="col-6">
                                    <label for="expires_at" class="mt-2">Ngày và giờ hết hạn</label>
                                    <input type="datetime-local" id="expires_at" name="expires_at" class="form-control">
                                    @error('expires_at')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>        
                                <div class="col-6">
                                    <label for="is_active">Is Active</label>
                                    <input type="hidden" name="is_active" value="0">
                                    <input type="checkbox" class="mt-3" id="is_active" name="is_active" value="1">
                                </div>
                        
                                <button type="submit" class="btn btn-success mt-2">Thêm mới</button>
                            </form>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@section('js')
@endsection