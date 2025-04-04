@extends('Layout.master')
@section('title')
    thêm danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Thêm danh mục mới</h5>
                </div><!-- end card header -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.category.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Tên danh mục</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('name') is-invalid @enderror"
                                                name="name" value="{{ old('name') }}"
                                                placeholder="Nhập tên danh mục ">
                                            @error('name')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary justify-content-center">Thêm</button>
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