<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
@section('title')
    Add SubCategory
@endsection
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0">Add SubCategory </h5>
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
                    <form action="{{ route('admins.subcategory.store') }}" method="post" enctype="multipart/form-data">
                        @csrf
                        <div class="row">
                            <div class="col-md-6">
                                <div class="">
                                    <label for="">Name</label>
                                    <input type="text" name="name" class="form-control mt-2 "
                                        placeholder="Vui lòng nhập tên">
                                    @error('name')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <label for="">Image</label>
                                    <input type="file" name="image" class="form-control mt-2 col-6">
                                    @error('image')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mt-2">
                                    <label for="">Category_id</label>
                                    <select name="category_id" id="" class="form-select mt-2">
                                        @foreach ($category_id as $item)
                                            <option value="{{ $item->id }}">{{ $item->name }}</option>
                                        @endforeach

                                    </select>
                                    @error('category_id')
                                        <span style="color:red">{{ $message }}</span>
                                    @enderror
                                    <div class="mt-2">
                                        <label for="status">Trạng thái</label>
                                        <select name="status" class="form-select">
                                            <option value="1" {{ old('status') == '1' ? 'selected' : '' }}>Sử dụng
                                            </option>
                                            <option value="0" {{ old('status') == '0' ? 'selected' : '' }}>
                                                Khóa</option>
                                        </select>
                                        @error('status')
                                            <span style="color:red">{{ $message }}</span>
                                        @enderror
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-2">Thêm mới</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
