@extends('Layout.master')
@section('title')
    danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-2">Tất cả danh mục</h5>
                    <a  href="{{ route('admins.product.create') }}" class="btn btn-success ml-auto">Thêm mới danh mục</a>
                </div>
                @if (session('success'))
                <div class="alert alert-danger col-3 mt-2 ms-2"  id="success-alert">
                    {{ session('success') }}
                </div>
            @endif
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="example" class="table table-bordered dt-responsive nowrap table-striped align-middle"
                            style="width:100%">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th scope="col">Product_code </th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Giá khuyến mãi </th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Is_sale</th>
                                    <th scope="col">Is_hot</th>
                                    <th scope="col">Is_show_home</th>
                                    <th scope="col">Is_active</th>
                                    <th scope="col">Sub_category_id </th>
                                    <th scope="col">Hành động</th>

                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $stt = 1;
                                ?>
                                @foreach ($Product as $index => $item)
                                    <tr>

                                        <th><?php echo $stt ++; ?></th>
                                        <th scope="row">{{ $item->product_code }}</th>
                                        <td><img src="{{ Storage::url($item->image) }}" alt="" width="100px" height="120px" ></td>
                                        <td>{{ $item->name }}</td>

                                        <td>{{ number_format($item->price) }}</td>
                                        <td>{{ number_format($item->price_sale) }}</td>
                                        <td>{{ $item->description }}</td>
                                        <td>{!! Str::limit($item->content, 50) !!}</td>
                                        @php
                                            $statusFields = [
                                                'is_sale' => 'Sale',
                                                'is_hot' => 'Hot',
                                                'is_show_home' => 'Show Home',
                                                'is_active' => 'Active',
                                            ];
                                        @endphp

                                        @foreach ($statusFields as $field => $label)
                                            <td>
                                                {!! $item->$field
                                                    ? '<span class="badge rounded-pill text-bg-primary">Hiện</span>'
                                                    : '<span class="badge rounded-pill text-bg-danger">Ẩn</span>' !!}
                                            </td>
                                        @endforeach
                                        <td>
                                            {{ $item->SubCate->name}}
                                        </td>
                                        <td>
                                            <a href="{{ route('admins.product.edit', $item->id) }}"><i
                                                    class="mdi mdi-pencil text-muted fs-18 rounded-2 border p-1 me-1"></i></a>
                                            <form action="{{ route('admins.product.destroy', $item->id) }}" method="post"
                                                class="d-inline " onsubmit="return confirm('bạn có muốn xóa không ?')">
                                                @csrf
                                                @method('delete')
                                                <button type="submit" class="border-0 bg-white"><i
                                                        class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"></i></button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
@endsection
<script>
    document.addEventListener('DOMContentLoaded', function () {
    const alert = document.getElementById('success-alert');
    if (alert) {
        setTimeout(() => {
            alert.style.opacity = '1'; // Làm mờ dần
            setTimeout(() => alert.remove(), 500); // Xóa thông báo sau 500ms
        }, 3000); // Hiển thị trong 3 giây
    }
});

</script>
@section('script-libs')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <!--datatable js-->
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>

    <script src="{{ asset('assets/js/pages/datatables.init.js') }}"></script>
@endsection
