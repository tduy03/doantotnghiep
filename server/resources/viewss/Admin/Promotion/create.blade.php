@extends('Layout.master')
@section('title')
Thêm mã khuyến mãi mới
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Thêm mã khuyến mãi mới</h5>
            </div><!-- end card header -->

            <div class="card-body">
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
                    <form action="{{ route('admins.promotion.store') }}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <!-- Left Column -->
                                <div class="mb-3">
                                    <label for="code">Mã code</label>
                                    <input type="text" name="code" class="form-control mt-2" placeholder="Nhập mã code" value="">
                                    @error('code')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="discount">Giảm giá</label>
                                    <input type="text" name="discount" class="form-control mt-2" placeholder="Nhập giảm giá" value="{{ old('discount') }}">
                                    @error('discount')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="discount_type">Loại giảm giá</label>
                                    <select name="discount_type" class="form-select">
                                        <option value="percentage" {{ old('discount_type') == 'percentage' ? 'selected' : '' }}>Giảm giá theo phần trăm</option>
                                        <option value="fixed" {{ old('discount_type') == 'fixed' ? 'selected' : '' }}>Giảm giá trực tiếp</option>
                                    </select>
                                    @error('discount_type')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="minimum_spend">Giá tiền tối thiểu của sản phẩm </label>
                                    <input type="text" name="minimum_spend" class="form-control mt-2" value="{{ old('minimum_spend') }}" placeholder="Nhập giá tiền tối thiểu để áp dụng khuyến mãi">
                                    @error('minimum_spend')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>

                            <div class="col-md-6">
                                <!-- Right Column -->
                                <div class="mb-3">
                                    <label for="start_date">Ngày bắt đầu </label>
                                    <input type="date" name="start_date" class="form-control mt-2" value="{{ old('start_date') }}">
                                    @error('start_date')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="end_date">Ngày kết thúc</label>
                                    <input type="date" name="end_date" class="form-control mt-2" value="{{ old('end_date') }}">
                                    @error('end_date')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="usage_limit">Số lượng</label>
                                    <input type="text" name="usage_limit" placeholder="Nhập số lượng" class="form-control mt-2" value="{{ old('usage_limit') }}">
                                    @error('usage_limit')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="status">Trạng thái</label>
                                    <select name="status" class="form-select">
                                        <option value="active" {{ old('status') == 'active' ? 'selected' : '' }}>Sử dụng</option>
                                        <option value="inactive" {{ old('status') == 'inactive' ? 'selected' : '' }}>Khóa</option>
                                    </select>
                                    @error('status')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-primary mt-2">Thêm </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
