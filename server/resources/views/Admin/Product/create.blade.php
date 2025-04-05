<div>
    <!-- Order your soul. Reduce your wants. - Augustine -->
</div>
@extends('Layout.master')
@section('title')
    thêm sản phẩm
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">

                <div class="card-header">
                    <h5 class="card-title mb-0">Thêm mới sản phẩm</h5>
                </div><!-- end card header -->

                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 ">
                            <form action="{{ route('admins.product.store') }}" method="POST" enctype="multipart/form-data">
                                @csrf
                                <div class="row">
                                    <div class="col-md-4">
                                        @error('products')
                                            <div class="alert alert-danger">{{ $message }}</div>
                                        @enderror
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Tên sản phẩm</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('name') is-invalid @enderror" name="name"
                                                value="{{ old('name') }}" placeholder="name ">
                                            @error('name')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Giá</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('price') is-invalid @enderror" name="price"
                                                value="{{ old('price') }}" placeholder="price "
                                                oninput="formatPrice(this)" onblur="removeCommas(this)">
                                            @error('price')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>

                                        <script>
                                            // Hàm để thêm dấu phẩy khi người dùng nhập giá
                                            function formatPrice(input) {
                                                let value = input.value.replace(/[^0-9]/g, ''); // Loại bỏ tất cả các ký tự không phải số
                                                value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Thêm dấu phẩy vào mỗi 3 chữ số
                                                input.value = value;
                                            }

                                            // Hàm để loại bỏ dấu phẩy khi gửi form (trước khi lưu vào cơ sở dữ liệu)
                                            function removeCommas(input) {
                                                input.value = input.value.replace(/,/g, ''); // Loại bỏ dấu phẩy
                                            }
                                        </script>
                                        
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Ảnh </label>
                                            <input type="file" id="simpleinput"
                                                class="form-control  @error('image') is-invalid @enderror" name="image"
                                                value="{{ old('title') }}" placeholder="image ">
                                            @error('image')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Mô tả ngắn</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('description') is-invalid @enderror"
                                                name="description" value="{{ old('description') }}"
                                                placeholder="description ">
                                            @error('description')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="content" class="form-label">Thông tin sản phẩm</label>
                                            <textarea class="form-control" id="content" name="content"></textarea>
                                        </div>
                                        <script>
                                            // Kích hoạt CKEditor
                                            CKEDITOR.replace('content', {
                                                language: 'vi',
                                                toolbar: [
                                                    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat'] },
                                                    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'] },
                                                    { name: 'insert', items: ['Image', 'Table', 'HorizontalRule'] },
                                                    { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
                                                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                                                    { name: 'tools', items: ['Maximize'] },
                                                ],
                                                height: 300,
                                            });
                                        </script>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Giá sale</label>
                                            <input type="text" id="simpleinput"
                                                class="form-control  @error('price_sale') is-invalid @enderror"
                                                name="price_sale" value="{{ old('price_sale') }}"
                                                placeholder="price_sale "
                                                oninput="formatPrice(this)" onblur="removeCommas(this)">
                                            @error('price_sale')
                                                <p class="text-danger">{{ $message }}</p>
                                            @enderror
                                        </div>
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Danh mục</label>
                                            <select class="form-select" aria-label="Default select example"
                                                name="sub_category_id">
                                                @foreach ($categories as $cat)
                                                    <optgroup label="{{ $cat->name }}">
                                                        @foreach ($cat->subcategories as $subcat)
                                                            <option value="{{ $subcat->id }}">{{ $subcat->name }}
                                                            </option>
                                                        @endforeach
                                                    </optgroup>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="mb-3 d-flex gap-3">
                                            <?php
                                            $is_cative = [
                                                'Ưu Đãi' => ['is_sale', 'form-switch-secondary'],
                                                'Hot' => ['is_hot', 'form-switch-red'],
                                                'Show' => ['is_show_home', 'form-switch-info'],
                                                'Trạng Thái' => ['is_active', 'form-switch-danger'],
                                            ];
                                            ?>
                                            @foreach ($is_cative as $key => $value)
                                                <div class="form-check form-switch {{ $value[1] }}">
                                                    <input class="form-check-input" type="checkbox" role="switch"
                                                        id="SwitchCheck{{ $value[0] }}" name="{{ $value[0] }}"
                                                        value="1" checked>
                                                    <label class="form-check-label"
                                                        for="SwitchCheck{{ $value[0] }}">{{ $key }}</label>
                                                </div>
                                            @endforeach
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Sản phẩm biến thế</label>
                                            <i class="mdi mdi-plus text-muted fs-18 rounded-2 border p-1 ms-3"
                                                style="cursor: pointer" id="add-variant"></i>
                                            <table class="table align-middle table-nowrap mb-0">
                                                <tbody id="variant-table-body">
                                                    <tr class="">
                                                        <td class="d-flex align-items-center">
                                                            <div class="mb-3 mx-3">
                                                                <label for="simpleinput" class="form-label">Màu sắc</label>
                                                                <select class="form-select"
                                                                    aria-label="Default select example"
                                                                    name="products[0][color_id]">
                                                                    @foreach ($color as $colors)
                                                                        <option value="{{ $colors->id }}">
                                                                            {{ $colors->name }}</option>
                                                                    @endforeach
                                                                </select>
                                                            </div>
                                                            <div class="mb-3 mx-3">
                                                                <label for="simpleinput" class="form-label">Kích thước</label>
                                                                <select class="form-select"
                                                                    aria-label="Default select example"
                                                                    name="products[0][size_id]">
                                                                    @foreach ($size as $sizes)
                                                                        <option value="{{ $sizes->id }}">
                                                                            {{ $sizes->name }}</option>
                                                                    @endforeach
                                                                </select>
                                                            </div>
                                                            <div class="mb-3">
                                                                <label for="simpleinput" class="form-label">Số lượng</label>
                                                                <input type="text" name="products[0][quantity]"
                                                                    class="form-control">
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <i class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1 remove-variant"
                                                                style="cursor: pointer"></i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="simpleinput" class="form-label">Album hình ảnh</label>
                                            <i class="mdi mdi-plus text-muted fs-18 rounded-2 border p-1 ms-3"
                                                style="cursor: pointer" id="add-row"></i>
                                            <table class="table align-middle table-nowrap mb-0">
                                                <tbody id="image-table-body">
                                                    <tr class="">
                                                        <td class="d-flex align-items-center">
                                                            <input type="file" class="form-control"
                                                                name="list_hinh_anh[id_0]" onchange="previewImage(this,0)"
                                                                id="hinh_anh">
                                                        </td>
                                                        <td>
                                                            <i class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"
                                                                style="cursor: pointer"></i>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
@section('script-libs')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var rowCount = 1;
            document.getElementById('add-row').addEventListener('click', function(e) {
                var tableBody = document.getElementById('image-table-body');
                var newRow = document.createElement('tr');
                newRow.innerHTML = `
            <td class="d-flex align-items-center">
                    <input type="file" class="form-control"
                        name="list_hinh_anh[id_${rowCount}]" onchange="previewImage(this,${rowCount})"
                        id="hinh_anh">
                </td>
                <td>
                    <i class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"
                    style="cursor: pointer" onclick="removeRow(this)"></i>
                </td>
            `;
                tableBody.appendChild(newRow);
                rowCount++;

            })
        })

        function previewImage(input, rowIndex) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(`preview_${rowIndex}`).setAttribute(`src`, e.target.result)
                }

                reader.readAsDataURL(input.files[0]);
            }
        }

        function removeRow(item) {
            var row = item.closest(`tr`);
            if (row) {
                row.remove();
            }
        }
    </script>

    <script>
        document.getElementById('add-variant').addEventListener('click', function() {
            var rowCount = 1;
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td class="d-flex align-items-center">
                <div class="mb-3 mx-3">
                    <label for="simpleinput" class="form-label">Màu sắc</label>
                    <select class="form-select" aria-label="Default select example" name="products[${rowCount}][color_id]">
                        @foreach ($color as $colors)
                            <option value="{{ $colors->id }}">{{ $colors->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3 mx-3">
                    <label for="simpleinput" class="form-label">Kích thước</label>
                    <select class="form-select" aria-label="Default select example" name="products[${rowCount}][size_id]">
                        @foreach ($size as $sizes)
                            <option value="{{ $sizes->id }}">{{ $sizes->name }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="mb-3">
                    <label for="simpleinput" class="form-label">Số lượng</label>
                    <input type="text" name="products[${rowCount}][quantity]" class="form-control">
                </div>
            </td>
            <td>
                <i class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1 remove-variant" style="cursor: pointer"></i>
            </td>
        `;
            document.getElementById('variant-table-body').appendChild(newRow);
        });


        document.getElementById('variant-table-body').addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-variant')) {

                event.target.closest('tr').remove();
            }
        });
    </script>
@endsection
