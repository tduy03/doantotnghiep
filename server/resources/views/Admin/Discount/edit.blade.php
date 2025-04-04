@extends('Layout.master')
@section('title')
Cập nhật mã khuyến mãi
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Cập nhật mã giảm giá</h5>
            </div><!-- end card header -->

            <div class="card-body">
                @if (session('success'))
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                @endif
                @if (session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                @endif
                <form action="{{ route('admins.discounts.update', $discount->id) }}" method="POST">
                    @csrf
                    @method('PUT')
            
                    <div class="col-6">
                        <label for="sub_category_id" class="mt-2">Danh mục</label>
                        <select id="sub_category_id" name="sub_category_id" class="form-control">
                            <option value="" disabled>Chọn danh mục</option>
                            @foreach ($categories as $category)
                                <option value="{{ $category->id }}" {{ $category->id == $discount->sub_category_id ? 'selected' : '' }}>
                                    {{ $category->name }}
                                </option>
                            @endforeach
                        </select>
                        @error('sub_category_id')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
            
                    <div class="col-6">
                        <label for="discount_percent" class="mt-2">Phần trăm giảm giá</label>
                        <input type="number" id="discount_percent" name="discount_percent" step="0.01" class="form-control"
                               value="{{ $discount->discount_percent }}">
                        @error('discount_percent')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="col-6">
                        <label for="expires_at" class="mt-2">Ngày và giờ hết hạn</label>
                        <input type="datetime-local" id="expires_at" name="expires_at" class="form-control" value="{{ $discount->expires_at }}">
                        @error('expires_at')
                            <span class="text-danger">{{ $message }}</span>
                        @enderror
                    </div>
                    <div class="col-6">
                        <label for="is_active">Trạng thái</label>
                        <input type="hidden" name="is_active" value="0">
                        <input type="checkbox" class="mt-3" id="is_active" name="is_active" value="1" {{ $discount->is_active ? 'checked' : '' }}>
                    </div>
            
                    <button type="submit" class="btn btn-primary mt-2">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>
@endsection
