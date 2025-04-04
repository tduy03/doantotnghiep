<div>
    <!-- Walk as if you are kissing the Earth with your feet. - Thich Nhat Hanh -->
</div>
@extends('Layout.master')
@section('title')
    Thêm banner
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Thêm banner mới</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <form action="{{ route('admins.banner.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="row d-flex flex-column">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="title" class="form-label">Tiêu đề</label>
                                            <input type="text" id="title"
                                                class="form-control @error('title') is-invalid @enderror" name="title"
                                                value="{{ old('title') }}" placeholder="Title">
                                            @error('title')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="image" class="form-label">Hình ảnh</label>
                                            <input type="file" id="image"
                                                class="form-control @error('image') is-invalid @enderror" name="image"
                                                onchange="showImage(event)">
                                            @error('image')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                            <img src="" alt="Hình ảnh sản phẩm" style="width:150px; display:none"
                                                id="img_danh_muc">
                                        </div>
                                    </div>
                                </div>
                                

                                <button type="submit" class="btn btn-primary justify-content-center">Thêm mới</button>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
@section('js')
    <script>
        function showImage(event) {
            const img_danh_muc = document.getElementById('img_danh_muc');
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                img_danh_muc.src = reader.result;
                img_danh_muc.style.display = 'block';
            }
            if (file) {
                reader.readAsDataURL(file);
            }
        }
    </script>
@endsection
