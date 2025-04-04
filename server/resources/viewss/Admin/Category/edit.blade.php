@extends('Layout.master')
@section('title')
    Sửa danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-header">
                    <h5 class="card-title mb-0">Input Type</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.category.update',$category->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @method('PUT')
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Name</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('name') is-invalid @enderror"
                                                name="name" value="{{ $category->name }}"
                                                placeholder="name ">
                                            @error('name')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary justify-content-center">Gửi</button>
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