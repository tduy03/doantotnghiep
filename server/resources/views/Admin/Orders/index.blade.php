<div>
    <!-- You must be the change you wish to see in the world. - Mahatma Gandhi -->
</div>
@extends('Layout.master')
@section('title')
    danh sách đơn hàng
@endsection
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="card-title mb-0">Danh sách đơn hàng</h5>

                    <div class="d-flex gap-3">
                        <!-- Tìm theo trạng thái thanh toán -->
                        <form action="{{ route('admins.orders.search_OrderStatus') }}" method="post"
                            class="d-flex align-items-center">
                            @csrf
                            <select class="form-select me-2" aria-label="Tìm theo trạng thái thanh toán"
                                name="order_payment">
                                <option selected>Tìm theo trạng thái thanh toán</option>
                                @foreach ($trangThaiThanhToan as $key => $trangThaiThanhToans)
                                    <option value="{{ $key }}">
                                        {{ $key == 'chua_thanh_toan' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online' }}
                                    </option>
                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-primary">Tìm</button>
                        </form>

                        <!-- Tìm theo trạng thái đơn hàng -->
                        <form action="{{ route('admins.orders.search_OrderPayment') }}" method="post"
                            class="d-flex align-items-center">
                            @csrf
                            <select class="form-select me-2" aria-label="Tìm theo trạng thái đơn hàng" name="order_status">
                                <option selected>Tìm theo trạng thái đơn hàng</option>
                                @foreach ($trangThaiDonHang as $key => $trangThaiDonHangs)
                                    <option value="{{ $key }}">{{ $trangThaiDonHangs }}</option>
                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-primary">Tìm</button>
                        </form>

                        <!-- Tìm kiếm theo từ khóa -->
                        <form action="{{ route('admins.orders.search') }}" method="post" class="d-flex align-items-center">
                            @csrf
                            <input type="text" class="form-control me-2" name="key" placeholder="Nhập từ khóa...">
                            <button type="submit" class="btn btn-primary">Tìm</button>
                        </form>
                    </div>
                </div> <!-- end card header -->

                <div class="card-body">
                    <div class="card-body">
                        @if (session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif
                        @if (session('error'))
                            <div class="alert alert-danger">
                                {{ session('error') }}
                            </div>
                        @endif
                        <div class="table-responsive">
                            <table class="table table-striped mb-0">

                                <thead>
                                    <tr>
                                        <th scope="col">Mã sản phẩm</th>
                                        <th scope="col">Ngày đặt</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Tổng tiền</th>
                                        <th>Thay đổi trạng thái đơn hàng </th>
                                        <th>Trạng thái thanh toán</th>
                                        <th scope="col">Hành động</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($listDonHang as $item)
                                        <tr>
                                            <td>
                                                <a href="javascript:void(0);"
                                                    onclick="loadOrderDetails({{ $item->id }})"
                                                    data-id="{{ $item->id }}">
                                                    {{ $item->code_order }}
                                                </a>
                                            </td>

                                            {{-- hiện  --}}




                                            <td>{{ $item->created_at->format('d-m-y') }}</td>
                                            <td>{{ $trangThaiDonHang[$item->order_status] ?? 'Không xác định' }}</td>
                                            <td>{{ number_format($item->total_amount) }}</td>
                                            <td>
                                                <form action="{{ route('admins.orders.update', $item->id) }}"
                                                    method="post">
                                                    @csrf
                                                    @method('PUT')
                                                    <select name="order_status" class="form-select w-50"
                                                        onchange="confirmSubmit(this)"
                                                        data-default-value="{{ $item->order_status }}">
                                                        @foreach ($trangThaiDonHang as $key => $value)
                                                            <option value="{{ $key }}"
                                                                {{ $item->order_status == $key ? 'selected' : '' }}
                                                                {{ $key == 'huy_hang' ? 'disabled' : '' }}>
                                                                {{ $value }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </form>

                                            </td>

                                            <td>
                                                @if ($item->order_payment == 'chua_thanh_toan')
                                                    <p>thanh toán khi nhận hàng</p>
                                                @else
                                                    <p>thanh toán onl</p>
                                                @endif

                                            </td>
                                            <td>
                                                <a href="{{ route('admins.orders.show', $item->id) }}">
                                                    <i class="mdi mdi-eye"></i>
                                                </a>

                                                @if ($item->trang_thai_don_hang == 'huy_hang')
                                                    <form action="{{ route('admins.orders.destroy', $item->id) }}"
                                                        method="post" class="d-inline "
                                                        onsubmit="return confirm('bạn có muốn xóa không ?')">
                                                        @csrf
                                                        @method('delete')
                                                        <button type="submit" class="border-0 bg-white"><i
                                                                class="mdi mdi-delete text-muted fs-18 rounded-2 border p-1"></i></button>
                                                    </form>
                                                @endif
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
    </div>

@endsection
@section('script-libs')
    <script>
        function confirmSubmit(selectElement) {
            if (confirm("bạn có chắc muốn thay đổi trạng thái đơn hàng ")) {
                selectElement.closest('form').submit();
            } else {
                // Revert to original value if the user cancels
                selectElement.value = selectElement.getAttribute('data-default-value');
            }
        }



        function loadOrderDetails(orderId) {
            // console.log(orderId); // In ra ID đơn hàng (ví dụ: 123)

            const modalBody = document.getElementById('modal-body');

            const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
            modal.show();

            // Gửi yêu cầu đến API để lấy chi tiết đơn hàng

            fetch(`/admins/orders/${orderId}/getOrderDetail`)
                .then(response => response.json())
                .then(data => {


                    const order = data.donhang;
                    const OrderDetail = order.order_detail;
                    const trangThaiDonHang = data.trangthaidonhang;
                    console.log(order);
                    console.log(OrderDetail);
                    console.log(trangThaiDonHang[order.order_status]);
                    // Hiển thị thông tin đơn hàng trong modal
                    let content = `<p><strong>Mã đơn hàng:</strong> ${order.code_order}</p>`;
                    content += `<p><strong>Trạng thái:</strong> ${ trangThaiDonHang[order.order_status]}</p>`;
                    content += `<p><strong>Người mua:</strong> ${order.username}</p>`;
                    content += `<p><strong>Số điện thoại:</strong> ${order.phone}</p>`;
                    content += `<p><strong>Giá tiênf:</strong> ${order.total_amount.toLocaleString()} VNĐ</p>`;
                    // content += `<p><strong>Trạng thái:</strong> ${order.order_status}</p>`;
                    // content += `<p><strong>Trạng thái:</strong> ${order.order_status}</p>`;
                    content += `<ul>`;


                        content += OrderDetail.map((detail, index) => {
            return `
                <li>
                    <img
                    src="http://127.0.0.1:8000/storage/${detail.product_detail.product.image}"
                  name="http://127.0.0.1:8000/storage/${detail.product_detail.product.image}"
                     alt="" width="100">  <strong>${detail.product_detail.product.name}</strong> -
                    Số lượng: ${detail.quantity} X  Giá: ${detail.product_detail.product.price.toLocaleString()} VNĐ = ${detail.total_amount.toLocaleString()} VNĐ

                </li>`;
        }).join(''); // Nối các phần tử của mảng lại thành chuỗi HTML

        content += `</ul>`;

                    // content += contentArray.join(''); // Nối các phần tử của mảng lại thành chuỗi HTML


                    modalBody.innerHTML = content;

                })
                .catch(error => {
                    console.error('Error:', error);
                    modalBody.innerHTML = '<p>Có lỗi xảy ra khi tải dữ liệu.</p>'.error;
                });
        }
    </script>
@endsection
<!-- Modal Chi tiết Đơn hàng -->
<div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="orderDetailsModalLabel">Chi tiết đơn hàng</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modal-body">
                <!-- Nội dung sẽ được thêm vào đây -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
