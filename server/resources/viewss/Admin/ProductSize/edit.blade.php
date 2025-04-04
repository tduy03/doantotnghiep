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
                            <form action="{{ route('admins.product_sizes.update', $productSizess->id) }}" method="POST">
                                @csrf
                                @method('PUT') <!-- Phương thức cập nhật -->
                                
                                <div>
                                    <label for="name" class="mt-2">Name Size</label>
                                    <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $productSizess->name) }}">
                                    @error('name')
                                        <span class="text-danger">{{ $message }}</span>
                                    @enderror
                                </div>
                        
                                <button type="submit" class="btn btn-success mt-2">Update</button> <!-- Đổi từ Create sang Update -->
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