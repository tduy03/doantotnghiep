@extends('Layout.master')
@section('title')
    danh mục
@endsection
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-2">Tất cả bình luận</h5>
                </div>
                {{-- {{ dd(session('success')) }} --}}
                @if (session('success'))
                    <div class="alert alert-danger col-3 mt-2 ms-2" id="success-alert">
                        {{ session('success') }}
                    </div>
                @endif
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="example" class="table table-bordered dt-responsive nowrap table-striped align-middle"
                            style="width:100%">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tài khoản</th>
                                    <th scope="col">Sản phẩm</th>
                                    <th scope="col">Bình luận</th>
                                    <th scope="col">Đánh giá</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Trả lời bình luận</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($comment as $item)
                              
                                    <tr>
                                        <th scope="row">{{ $item->id }}</th>
                                        <!-- Display user email -->
                                        <td>{{ $item->user->email }}</td>
                                        <!-- Display product name -->
                                        <td>{{ $item->product->name }}</td>
                                        <td>{{ $item->comment }}</td>
                                        <td>{{ $item->rating }}</td>
                                        <!-- Status dropdown -->
                                        <td>
                                            <form action="{{ route('admins.comment.update', $item->id) }}" method="POST">
                                                @csrf
                                                @method('PUT')
                                                <select name="status" class="form-select form-select-sm"
                                                    onchange="this.form.submit()">
                                                    <option value="1" {{ $item->status == 1 ? 'selected' : '' }}>Hiển
                                                        thị</option>
                                                    <option value="0" {{ $item->status == 0 ? 'selected' : '' }}>Ẩn
                                                    </option>
                                                </select>
                                            </form>
                                        </td>
                                        <td>
                                            <p class="d-inline-flex gap-1">
                                                <a class="btn btn-primary" data-bs-toggle="collapse"
                                                    href="#collapse{{ $item->id }}" role="button" aria-expanded="false"
                                                    aria-controls="collapse{{ $item->id }}">
                                                    trả lời
                                                </a>
                                            </p>
                                            <div class="collapse" id="collapse{{ $item->id }}">
                                                <div class="card card-body">
                                                    <form action="{{ route('admins.comment.traloi', $item->id) }}"
                                                        method="post">
                                                        @csrf
                                                        <input type="text" name="comment">
                                                        <button type="submit" class="btn btn-warning">Gửi</button>
                                                    </form>
                                                </div>
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
        document.addEventListener('DOMContentLoaded', function() {
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
