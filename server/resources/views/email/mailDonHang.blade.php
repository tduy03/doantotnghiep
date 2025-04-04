<div>
    <h1>Xác nhận đơn hàng</h1>
    <p>Xin chào {{ $order->username }},</p>
    <p>Cảm ơn bạn đã đặt hàng từ cửa hàng của chúng tôi. Đây là thông tin đơn hàng của bạn:</p>

    <p><strong>Mã đơn hàng:</strong> {{ $order->code_order }}</p>

    <p><strong>Sản phẩm đã đặt:</strong></p>
    <ul>
        @foreach ($order->OrderDetail as $item)
            <li>Tên sản phẩm: {{ $item->productDetail->product->name }} x Số lượng: {{ $item->quantity }} - Giá :{{ number_format($item->total_amount) }} VND</li>
        @endforeach
    </ul>

    <p><strong>Tổng tiền:</strong> {{ number_format($order->total_amount) }} VND</p>

    <p>Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.</p>
    <p>Cảm ơn bạn đã mua hàng ở shop chúng tôi!</p>
    <p>Trân trọng,</p>
</div>