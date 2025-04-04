@extends('Layout.master')
@section('title')
    thêm danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Thêm kích thước mới</h5>
                </div><!-- end card header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <form action="{{ route('admins.product_sizes.store') }}" method="POST">
                                @csrf
                                <div>
                                    <label for="Name" class="mt-2">Tên kích thước</label>
                                    <input type="text" id="discount_percent" name="name" class="form-control"
                                    >
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
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