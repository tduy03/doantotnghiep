@extends('Layout.master')
@section('title')
Cập nhật mã khuyến mãi
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Cập nhật mã khuyến mãi</h5>
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
                <form action="{{ route('admins.promotion.update', $model->id) }}" method="post" enctype="multipart/form-data">
                    @csrf
                    @method('PUT')
                    <div class="row">
                        <div class="col-md-6">
                            <!-- Left Column -->
                            <div class="mb-3">
                                <label for="code">Code</label>
                                <input type="text" name="code" class="form-control mt-2" value="{{ $model->code }}">
                                @error('code')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="discount">Discount</label>
                                <input type="text" name="discount" class="form-control mt-2" value="{{ $model->discount }}">
                                @error('discount')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="discount_type">Discount Type</label>
                                <select name="discount_type" class="form-select">
                                    <option value="percentage" {{ $model->discount_type == 'percentage' ? 'selected' : '' }}>Percentage</option>
                                    <option value="fixed" {{ $model->discount_type == 'fixed' ? 'selected' : '' }}>Fixed</option>
                                </select>
                                @error('discount_type')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="minimum_spend">Minimum Spend</label>
                                <input type="text" name="minimum_spend" class="form-control mt-2" value="{{ $model->minimum_spend }}">
                                @error('minimum_spend')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-md-6">
                            <!-- Right Column -->
                            <div class="mb-3">
                                <label for="start_date">Start Date</label>
                                <input type="date" name="start_date" class="form-control mt-2" value="{{ $model->start_date }}">
                                @error('start_date')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="end_date">End Date</label>
                                <input type="date" name="end_date" class="form-control mt-2" value="{{ $model->end_date }}">
                                @error('end_date')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="usage_limit">Usage Limit</label>
                                <input type="text" name="usage_limit" class="form-control mt-2" value="{{ $model->usage_limit }}">
                                @error('usage_limit')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                            <div class="mb-3">
                                <label for="status">Status</label>
                                <select name="status" class="form-select">
                                    <option value="Active" {{ $model->status == 'Active' ? 'selected' : '' }}>Active</option>
                                    <option value="Inactive" {{ $model->status == 'Inactive' ? 'selected' : '' }}>Inactive</option>
                                </select>
                                @error('status')
                                    <span style="color:red">{{ $message }}</span>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary mt-2">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>
@endsection
