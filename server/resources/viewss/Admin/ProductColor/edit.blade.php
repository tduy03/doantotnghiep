<div>
    <!-- He who is contented is rich. - Laozi -->
</div>
@extends('Layout.master')

@section('title')
Product Color
@endsection

@section('content')
    <h1>Edit Product color</h1>
    <form action="{{ route('admins.product_colors.update', $productcolors->id) }}" method="POST">
        @csrf
        @method('PUT') <!-- Phương thức cập nhật -->
        
        <div>
            <label for="name" class="mt-2">Tên màu</label>
            <input type="text" id="name" name="name" class="form-control" value="{{ old('name', $productcolors->name) }}">
            @error('name')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>
        <div>
            <label for="name" class="mt-2">Mã màu</label>
            <input type="text" id="name" name="color_code" class="form-control" value="{{ $productcolors->color_code }}">
            @error('color_code')
                <span class="text-danger">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="btn btn-success mt-2">Cập nhật</button> <!-- Đổi từ Create sang Update -->
    </form>
@endsection
