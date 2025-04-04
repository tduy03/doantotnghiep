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
                    <a  href="{{ route('admins.promotion.create') }}" class="btn btn-success ml-auto">Thêm mới khuyến mãi</a>
                </div>
                {{-- {{ dd(session('success')) }} --}}
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
                                    <th scope="col" style="width: 10px;">
                                        <div class="form-check">
                                            <input class="form-check-input fs-15" type="checkbox" id="checkAll" value="option">
                                        </div>
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Giảm giá</th>
                                    <th scope="col">Loại giảm giá</th>
                                    <th scope="col">Số tiến tối thiểu</th>
                                    <th scope="col">Ngày bắt đầu</th>
                                    <th scope="col">Ngày kết thúc</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($promotion as $item)
    
                                <tr>
                                    
                                    <th scope="row">
                                        <div class="form-check">
                                            <input class="form-check-input fs-15" type="checkbox" name="checkAll"
                                                value="option1">
                                        </div>
                                    </th>
                                    <td>{{ $item->id }}</td>
                                            <td>{{ $item->code }}</td>
                                            <td>{{ $item->discount }}</td>
                                            <td>{{ $item->discount_type }}</td>
                                            <td>{{ $item->minimum_spend }}</td>
                                            <td>{{ $item->start_date }}</td>
                                            <td>{{ $item->end_date }}</td>
                                            <td>{{ $item->usage_limit }}</td>
                                            <td>{{ $item->status }}</td>
                                            <td>
                                                <div class="d-flex ">
                                                    <form action="{{ route('admins.promotion.destroy', $item) }}" method="post">
                                                        @csrf
                                                        @method('DELETE')
                                                        <button class="btn btn-danger" onclick="return confirm('Bạn có chắc chắn xóa không?')" style="border: none; background: none;">
                                                            <i class="fas fa-trash-alt text-danger"></i> <!-- Icon xóa -->
                                                        </button>
                                                    </form>
                                                    <a href="{{ route('admins.promotion.edit', $item) }}" class="btn btn-success ms-2" style="border: none; background: none;">
                                                        <i class="fas fa-edit text-success"></i> <!-- Icon sửa -->
                                                    </a>
                                                </div>
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

@section('script-libs')
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
