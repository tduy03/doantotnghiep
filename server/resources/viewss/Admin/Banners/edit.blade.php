<div>
    <!-- He who is contented is rich. - Laozi -->
</div>
@extends('Layout.master')
@section('title')
   Sửa banner
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-header">
                    <h5 class="card-title mb-0">Cập nhật banner</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.banner.update',$banner->id) }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                @method('put')
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Tên banner</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('title') is-invalid @enderror"
                                                name="title" value="{{ $banner->title }}"
                                                placeholder="Tên danh mục ">
                                            @error('title')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Hình ảnh</label>
                                            <input type="file" id="simpleinput" class="form-control" name="image"
                                                onchange="showImage(event)" id="hinh_anh">
                                            <img src="{{Storage::url($banner->image)}}" alt="Hình ảnh sản phẩm" style="width:150px; "
                                                id="img_danh_muc">
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
    <script>
        function showImage(event) {
            const img_danh_muc = document.getElementById('img_danh_muc');
            console.log(img_danh_muc)
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function() {
                img_danh_muc.src = reader.result;
                img_danh_muc.style.display = 'block';
            }
            if(file){
                reader.readAsDataURL(file);
            }
        }
    </script>
@endsection
