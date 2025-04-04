<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
@section('title')
    Edit
@section('content')
    <div class="col-xl-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between">
                <h5 class="card-title align-content-center mb-0"> SubCategory </h5>
            </div><!-- end card header -->
            <div class="card-body">
                <div class="card-body">
                    <form action="{{ route('admins.subcategory.update',$model->id) }}" method="post" enctype="multipart/form-data">
                        @csrf
                        @method('PUT')
                        <div class="">
                            <label for="">Name</label>
                            <input type="text" name="name" class="form-control mt-2" placeholder="Vui lòng nhập tên" value="{{$model->name}}">
                        </div>
                        <div class="mt-2">
                            <label for="">Image</label>
                            <input type="file" name="image" class="form-control mt-2" value="{{$model->image}}">
                        </div>
                        <div class="mt-2">
                            <label for="">Category_id</label>
                            <select name="category_id" id="" class="form-select mt-2" value="{{$model->category_id}}">
                    
                                @foreach($category_id as $item)
                                <option value="{{$item->id}}">{{$item->name}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mt-2">
                            <label for="status">Status</label>
                            <select name="status" class="form-select">
                                <option value="1" {{ $model->status == 'Active' ? 'selected' : '' }}>Active</option>
                                <option value="0" {{ $model->status == 'Inactive' ? 'selected' : '' }}>Inactive</option>
                            </select>
                            @error('status')
                                <span style="color:red">{{ $message }}</span>
                            @enderror
                        </div>
                        <button class="btn btn-primary mt-2">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
