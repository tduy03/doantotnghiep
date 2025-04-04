@extends('Layout.master')
@section('title')
    danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-2">Tất cả màu sắc</h5>
                    <a  href="{{ route('admins.product_colors.create') }}" class="btn btn-success ml-auto">Thêm màu sắc mới</a>
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
                                    <th>ID</th>
                                    <th>Tên</th> 
                                    <th >Màu sắc</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($productcolor as $productcolors)
                                    <tr>
                                        <td>{{ $productcolors->id }}</td>
                                        <td>{{ $productcolors->name }}</td> 
                                        <td style="width: 200px; text-align: center;">
                                            <button type="button" class="btn" style="
                                                background-color: {{ $productcolors->color_code }};
                                                width: 30px; /* Kích thước nút */
                                                height: 30px; /* Kích thước nút */
                                                border-radius: 50%; /* Tạo hình tròn */
                                                padding: 0; /* Bỏ padding để giữ hình tròn */
                                            " title="Màu: {{ $productcolors->color_code }}"></button>
                                        </td>
                                        <td>
                                            <a href="{{ route('admins.product_colors.edit', $productcolors->id) }}" class="btn btn-primary"><i class="fa fa-edit"></i></a>
                                            <form action="{{ route('admins.product_colors.destroy', $productcolors->id) }}" method="POST" style="display:inline-block;">
                                                @csrf
                                                @method('DELETE') <!-- Sử dụng phương thức DELETE -->
                                                <button type="submit" class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this discount?');">
                                                    <i class="fa fa-trash"></i>
                                                </button>
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
@if (session('success'))
<div class="alert alert-danger col-3 mt-2 ms-2"  id="success-alert">
    {{ session('success') }}
</div>
@endif
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
