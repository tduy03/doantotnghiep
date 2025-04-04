@extends('Layout.master')
@section('title')
    Sửa sản phẩm
@endsection
@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Chỉnh sửa sản phẩm</h5>
                </div><!-- end card header -->
                <div class="card-body">
                    <form action="{{ route('admins.product.update', $product->id) }}" method="POST"
                        enctype="multipart/form-data">
                        @csrf
                        @method('PUT')

                        <!-- Thông tin chung -->
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-3">
                                    @error('products')
                                        <div class="alert alert-danger">{{ $message }}</div>
                                    @enderror
                                    <label for="product_name" class="form-label">Name</label>
                                    <input type="text" id="product_name"
                                        class="form-control @error('name') is-invalid @enderror" name="name"
                                        value="{{ $product->name }}">
                                    @error('name')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="price" class="form-label">Price</label>
                                    <input type="number" id="price"
                                        class="form-control @error('price') is-invalid @enderror" name="price"
                                        value="{{ $product->price }}">
                                    @error('price')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="price_sale" class="form-label">Price_sale</label>
                                    <input type="number" id="price_sale"
                                        class="form-control @error('price_sale') is-invalid @enderror" name="price_sale"
                                        value="{{ $product->price_sale }}">
                                    @error('price_sale')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="simpleinput" class="form-label">Image</label>
                                    <input type="file" id="simpleinput"
                                        class="form-control  @error('image') is-invalid @enderror" name="image"
                                        value="{{ $product->image }}" placeholder="image ">
                                    <img src="{{ Storage::url($product->image) }}" alt="" width="100px">
                                    @error('image')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">description</label>
                                    <textarea id="description" class="form-control @error('description') is-invalid @enderror" name="description">{{ $product->description }}</textarea>
                                    @error('description')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="content" class="form-label">Content</label>
                                    <textarea id="content" class="form-control @error('content') is-invalid @enderror" name="content">{{ $product->content }}</textarea>
                                    @error('content')
                                        <p class="text-danger">{{ $message }}</p>
                                    @enderror
                                    <script>
                                        // Kích hoạt CKEditor
                                        CKEDITOR.replace('content', {
                                            language: 'vi', // Ngôn ngữ Tiếng Việt
                                            toolbar: [{
                                                    name: 'basicstyles',
                                                    items: ['Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat']
                                                },
                                                {
                                                    name: 'paragraph',
                                                    items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent']
                                                },
                                                {
                                                    name: 'insert',
                                                    items: ['Image', 'Table', 'HorizontalRule']
                                                },
                                                {
                                                    name: 'styles',
                                                    items: ['Format', 'Font', 'FontSize']
                                                },
                                                {
                                                    name: 'colors',
                                                    items: ['TextColor', 'BGColor']
                                                },
                                                {
                                                    name: 'tools',
                                                    items: ['Maximize']
                                                },
                                            ],
                                            height: 300, // Chiều cao của editor
                                        });
                                    </script>

                                </div>


                                <div class="mb-3">
                                    <label for="sub_category_id" class="form-label">Category</label>
                                    <select class="form-select" id="sub_category_id" name="sub_category_id">
                                        @foreach ($subcategory as $subcategorys)
                                            <option value="{{ $subcategorys->id }}"
                                                {{ $subcategorys->id == $product->sub_category_id ? 'selected' : '' }}>
                                                {{ $subcategorys->name }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>


                                <div class="mb-3 d-flex gap-3">
                                    <?php
                                    $is_active = [
                                        'Is Sale' => 'is_sale',
                                        'Is Hot' => 'is_hot',
                                        'Is Show Home' => 'is_show_home',
                                        'Is Active' => 'is_active',
                                    ];
                                    ?>
                                    @foreach ($is_active as $label => $name)
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox"
                                                id="SwitchCheck{{ $name }}" name="{{ $name }}"
                                                value="1" {{ $product->$name == 1 ? 'checked' : '' }}>
                                            <label class="form-check-label"
                                                for="SwitchCheck{{ $name }}">{{ $label }}</label>
                                        </div>
                                    @endforeach
                                </div>
                            </div>


                            <div class="col-md-6">

                                <div class="mb-3">
                                    <label for="images" class="form-label">Album hình ảnh</label>
                                    <i class="mdi mdi-plus text-muted fs-18 rounded-2 border p-1 ms-3"
                                        style="cursor: pointer" id="add-image-row"></i>
                                    <table class="table align-middle table-nowrap mb-0">
                                        <tbody id="image-table-body">
                                            @foreach ($product->images as $key => $image)
                                                <tr>
                                                    <td class="d-flex align-items-center">
                                                        <input type="file" class="form-control"
                                                            name="list_hinh_anh[{{ $image->id }}]"
                                                            onchange="previewImage(this, {{ $image->id }})">
                                                        <img src="{{ Storage::url($image->image) }}" alt=""
                                                            width="100px" id="preview_{{ $image->id }}">
                                                        <input type="hidden" name="list_hinh_anh[{{ $image->id }}]"
                                                            value="{{ $image->id }}">
                                                    </td>
                                                    <td>
                                                        <i class="mdi mdi-delete text-muted fs-18 rounded-2 border remove-image p-1"
                                                            style="cursor: pointer"></i>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Biến thể sản phẩm -->
                                <div class="mb-3">
                                    <input type="hidden" id="deleted_variants" name="deleted_variants" value="">
                                    <label for="variants" class="form-label">Sản phẩm biến thể</label>
                                    <i class="mdi mdi-plus text-muted fs-18 rounded-2 border p-1 ms-3"
                                        style="cursor: pointer" id="add-variant-row"></i>
                                    <table class="table align-middle table-nowrap mb-0">
                                        <tbody id="variant-table-body">
                                            @foreach ($product->ProductDetail as $key => $productDetail)
                                                <tr>
                                                    <td class="d-flex align-items-center">
                                                        <div class="mb-3 mx-3">
                                                            <label class="form-label">Color</label>
                                                            <select class="form-select"
                                                                name="products[{{ $key }}][color_id]">
                                                                @foreach ($color as $colors)
                                                                    <option value="{{ $colors->id }}"
                                                                        {{ $productDetail->color_id == $colors->id ? 'selected' : '' }}>
                                                                        {{ $colors->name }}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                        <div class="mb-3 mx-3">
                                                            <label class="form-label">Size</label>
                                                            <select class="form-select"
                                                                name="products[{{ $key }}][size_id]">
                                                                @foreach ($size as $sizes)
                                                                    <option value="{{ $sizes->id }}"
                                                                        {{ $productDetail->size_id == $sizes->id ? 'selected' : '' }}>
                                                                        {{ $sizes->name }}</option>
                                                                @endforeach
                                                            </select>
                                                        </div>
                                                        <div class="mb-3 mx-3">
                                                            <label class="form-label">Quantity</label>
                                                            <input type="number" class="form-control"
                                                                name="products[{{ $key }}][quantity]"
                                                                value="{{ $productDetail->quantity }}">
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <i class="mdi mdi-delete text-muted fs-18 rounded-2 border remove-variant p-1"
                                                            style="cursor: pointer"></i>
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Cập nhật sản phẩm</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('script-libs')
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let imageRowCount = {{ count($product->images) }};
            let variantRowCount = {{ count($product->ProductDetail) }};


            document.getElementById('add-image-row').addEventListener('click', function() {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="d-flex align-items-center">
                        <input type="file" class="form-control" name="list_hinh_anh[new_${imageRowCount}]" onchange="previewImage(this, 'new_${imageRowCount}')">
                        <img src="" alt="" width="100px" id="preview_new_${imageRowCount}">
                    </td>
                    <td>
                        <i class="mdi mdi-delete text-muted fs-18 rounded-2 border remove-image p-1" style="cursor: pointer"></i>
                    </td>
                `;
                document.getElementById('image-table-body').appendChild(newRow);
                imageRowCount++;
            });


            document.getElementById('add-variant-row').addEventListener('click', function() {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td class="d-flex align-items-center">
                        <div class="mb-3 mx-3">
                            <label class="form-label">Màu sắc</label>
                            <select class="form-select" name="products[${variantRowCount}][color_id]">
                                @foreach ($color as $colors)
                                    <option value="{{ $colors->id }}">{{ $colors->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3 mx-3">
                            <label class="form-label">Kích thước</label>
                            <select class="form-select" name="products[${variantRowCount}][size_id]">
                                @foreach ($size as $sizes)
                                    <option value="{{ $sizes->id }}">{{ $sizes->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="mb-3 mx-3">
                            <label class="form-label">Số lượng</label>
                            <input type="number" class="form-control" name="products[${variantRowCount}][quantity]" value="1">
                        </div>
                    </td>
                    <td>
                        <i class="mdi mdi-delete text-muted fs-18 rounded-2 border remove-variant p-1" style="cursor: pointer"></i>
                    </td>
                `;
                document.getElementById('variant-table-body').appendChild(newRow);
                variantRowCount++;
            });


            document.getElementById('image-table-body').addEventListener('click', function(event) {
                if (event.target.classList.contains('remove-image')) {
                    event.target.closest('tr').remove();
                }
            });


            // document.querySelectorAll('.remove-variant').forEach(function(button) {
            //     button.addEventListener('click', function() {
            //         var variantId = this.closest('tr').getAttribute('data-variant-id');
            //         if (variantId) {
            //             var deletedVariants = document.getElementById('deleted_variants').value;
            //             deletedVariants += (deletedVariants ? ',' : '') + variantId;
            //             document.getElementById('deleted_variants').value = deletedVariants;
            //         }
            //         this.closest('tr').remove();
            //     });
            // });

            document.getElementById('variant-table-body').addEventListener('click', function(event) {
                if (event.target.classList.contains('remove-variant')) {
                    const row = event.target.closest('tr');
                    const variantId = row.getAttribute('data-variant-id');
                    if (variantId) {
                        let deletedVariants = document.getElementById('deleted_variants').value;
                        deletedVariants += (deletedVariants ? ',' : '') + variantId;
                        document.getElementById('deleted_variants').value = deletedVariants;
                    }
                    row.remove();
                }
            });

        });


        function previewImage(input, id) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(`preview_${id}`).src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    </script>
@endsection
