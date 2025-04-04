<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\OrderConfirm;
use App\Models\Cart;
use App\Models\CartDetail;
use App\Models\Momo;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Promotion;
use App\Models\SubCategory;
use App\Models\UserPromotion;
use App\Models\vnpay;
use App\Models\Vnpayy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Log;


class ApiOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // đây là đơn hàng của tôi khi mua hàng rồi
    public function index()
    {
        $trangThaiDonHang = Order::TRANG_THAI_DON_HANG;
        $donHangs = Auth::user()->order()->orderBy('id', 'desc')->get();

        if (!$donHangs) {
            return response()->json([
                'message' => 'Không có đơn hàng',
            ], 404);
        }

        // Map orders to desired format and sort by descending ID
        $arrayDonHang = $donHangs->map(function ($donHang) use ($trangThaiDonHang) {
            return [
                'code_order' => $donHang->code_order,
                'username' => $donHang->username,
                'phone' => $donHang->phone,
                'address' => $donHang->address,
                'email' => $donHang->email,
                'note' => $donHang->note,
                'total_amount' => $donHang->total_amount,
                'id' => $donHang->id,
                'orderStatus' => $trangThaiDonHang[$donHang->order_status],

            ];
        })->sortByDesc('id')->values(); // Sort by ID in descending order

        // Flatten order details, map to desired format, and sort by descending ID
        $arrayChitietDonHang = $donHangs->flatMap(function ($donHang) use ($trangThaiDonHang) {
            return $donHang->orderDetail->map(function ($detail) use ($donHang, $trangThaiDonHang) {
                return [
                    'image' => $detail->productDetail->product->image,
                    'product_name' => $detail->productDetail->product->name,
                    'quantity' => $detail->quantity,
                    'price' => $detail->price,
                    'order_id' => $detail->id,
                    'orderStatus' => $trangThaiDonHang[$donHang->order_status],
                    'imageUrl' => 'http://127.0.0.1:8000/storage/' . $detail->productDetail->product->image,
                    'id' => $donHang->id,
                    'code_order' => $donHang->code_order,
                    'id_product' => $detail->productDetail->product->id,
                    'total_amount' => $donHang->total_amount,
                    'vn_payId' =>$donHang->vnpayy_id
                ];
            });
        })->sortByDesc('id')->values(); // Sort by ID in descending order

        $typeChoXacNhan = Order::CHO_XAC_NHA;
        $typeDangVanChuyen = Order::DANG_VAN_CHUYEN;

        return response()->json([
            'arrayDonHang' => $arrayDonHang,
            'chitietDonHang' => $arrayChitietDonHang,
            'trangThaiDonHang' => $trangThaiDonHang,
            'typeChoXacNhan' => $typeChoXacNhan,
            'typeDangVanChuyen' => $typeDangVanChuyen,
        ]);
    }

    // đây là hiện gia trang mua hàng
    public function create()
    {
        $userId = Auth::id();
        $subtotal = 0;
        $total = 0;
        $tax = 30000;
        $cartDetailsFormatted = [];


        if ($userId) {
            // Khi người dùng đã đăng nhập
            $cart = Cart::where('user_id', $userId)->with('cartDetails')->first();

            // Kiểm tra nếu có giỏ hàng trong session
            $sessionCart = session()->get('cart', []);

            if (!$cart && !empty($sessionCart)) {
                // Tạo giỏ hàng mới từ session nếu người dùng đăng nhập nhưng chưa có giỏ hàng
                $cart = Cart::create([
                    'user_id' => $userId,
                ]);

                // Chuyển sản phẩm từ session vào giỏ hàng cơ sở dữ liệu
                foreach ($sessionCart as $sessionDetail) {
                    $productDetail = ProductDetail::find($sessionDetail['product_detail_id']);
                    if ($productDetail) {
                        $cart->cartDetails()->create([
                            'product_detail_id' => $sessionDetail['product_detail_id'],
                            'quantity' => $sessionDetail['quantity'],
                            'price' => $sessionDetail['price'],
                        ]);
                    }
                }

                // Xóa giỏ hàng trong session sau khi đã đồng bộ
                session()->forget('cart');
            }

            if ($cart) {
                foreach ($cart->cartDetails as $detail) {
                    $productDetail = ProductDetail::find($detail->product_detail_id);
                    $product = Product::where('id',$productDetail->product_id)->first();
                    if($product->price_sale){
                        $price=$product->price_sale;
                    }else{
                        $price=$product->price;
                    }
                    // Chỉ tiếp tục nếu tìm thấy chi tiết sản phẩm
                    if (!$productDetail) {
                        continue;
                    }

                    // Tính toán subtotal cho sản phẩm
                    $itemSubtotal = $detail->price * $detail->quantity;
                    $subtotal += $itemSubtotal;

                    // Gọi dữ liệu từ productDetail
                    $colorName = $productDetail->productColor->name ?? 'N/A';
                    $sizeName = $productDetail->productSize->name ?? 'N/A';
                    $NameProduct = $productDetail->product->name;
                    $ImageProduct = $productDetail->product->image;
                    $PriceProduct = $price;

                    // Thêm vào mảng đã định nghĩa với đầy đủ thông tin sản phẩm
                    $cartDetailsFormatted[] = [
                        'product_detail_id' => $detail->product_detail_id,
                        'colorName' => $colorName,
                        'sizeName' => $sizeName,
                        'NameProduct' => $NameProduct,
                        'PriceProduct' => $PriceProduct,
                        'detail_id' => $detail->id,
                        'ImageProduct' => $ImageProduct,
                        'quantity' => $detail->quantity,
                        'price' => $detail->price,
                        'subtotal' => $itemSubtotal,
                        'imageUrl' => 'http://127.0.0.1:8000/storage/' . $ImageProduct
                    ];
                }
            } else {
                return response()->json(['error' => 'Chưa có sản phẩm trong giỏ hàng'], 404);
            }
        } else {
            // Khi người dùng chưa đăng nhập, lấy giỏ hàng từ session
            $cart = session()->get('cart', []);
            foreach ($cart as $detail) {
                $itemSubtotal = $detail['price'] * $detail['quantity'];
                $subtotal += $itemSubtotal;
                $cartDetailsFormatted[] = [
                    'product_detail_id' => $detail['product_detail_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $detail['price'],
                    'subtotal' => $itemSubtotal,
                ];
            }
        }

        // Tính tổng
        $total = $subtotal + $tax;

        return response()->json([
            'cart' => $cartDetailsFormatted,
            'tax' => $tax,
            'subtotal' => $subtotal,
            'total' => $total,
        ]);
    }

    // đây là khi kích vào nút mua hàng
    public function store(Request $request)
    {
        $request->validate([
            'address' => 'required',
            'commodity_money' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'shipping_id' => 'required',
            'total_amount' => 'required',
            'username' => 'required',
        ]);
        if ($request->isMethod('post')) {
            DB::beginTransaction();

            try {
                $user_id = Auth::id();
                if (!$user_id) {
                    return response()->json([
                        'error' => 'Người dùng chưa đăng nhập'
                    ], 401);
                }
                $params = $request->all();
                // if($request->input('paymentData')){
                //     $paymentData = $request->input('paymentData');
                //     $vnPay = Vnpayy::query()->where('vnp_TxnRef', $paymentData['vnp_TxnRef'])->first();
                //     $vnPay->update($paymentData);
                // }


                //                 $params = $request->input('orderData');
//                 $paymentData = $request->input('paymentData');

                //                 $vnPay = Vnpayy::query()->where('vnp_TxnRef', $paymentData['vnp_TxnRef'])->first();
//                 $vnPay->update($paymentData);
//                 $paymentDatas = $request->input('paymentDatas');
//                 $momo = Momo::query()->where('orderId',$paymentDatas['orderId'])->first();
//                 $momo->update($paymentDatas);


                $params['user_id'] = $user_id;
                $params['code_order'] = $this->generateUniqueOrderCode();
                $order = Order::create($params);
                if ($params['vnp_TxnReff']) {
                    $vnp_TxnReff = $params['vnp_TxnReff'];
                    $vnpayy = Vnpayy::where('vnp_TxnRef', $vnp_TxnReff)->first();
                    if ($vnpayy) {
                        $order->vnpayy_id = $vnpayy->id;
                        $order->order_payment = Order::DA_THANH_TOAN;
                        $order->save();
                    }
                }
                if ($params['promotion_id']) {
                    $promotion = Promotion::query()->where('id', $params['promotion_id'])->first();
                    $promotion->usage_limit -= 1;
                    $promotion->save();
                    $userPromotion = UserPromotion::query()->where('promotion_id', $params['promotion_id'])
                        ->where('user_id', $params['user_id'])->first();
                    if ($userPromotion->so_luong < 0) {
                        return response()->json([
                            'error' => 'Bạn đã dùng mã khuyến mại rồi!'
                        ], 404);
                    }
                    $userPromotion->so_luong -= 1;
                    $userPromotion->save();
                }
                $order_id = $order->id;

                // Xử lý giỏ hàng và tạo OrderDetail như trước
                $cart = Cart::where('user_id', $user_id)->first();
                if (!$cart) {
                    return response()->json([
                        'error' => 'Không có sản phẩm cần mua'
                    ], 404);
                }

                $cartDetails = CartDetail::where('cart_id', $cart->id)->get();
                if ($cartDetails->isEmpty()) {
                    return response()->json([
                        'error' => 'Giỏ hàng của bạn hiện đang trống'
                    ], 404);
                }

                foreach ($cartDetails as $item) {
                    $total = $item->price * $item->quantity;
                    $detail = ProductDetail::query()->where('id', $item->product_detail_id)->first();
                    if ($item->quantity > $detail->quantity) {
                        return response()->json(['error' => 'Số lượng kho đã hết vui lòng mua sản phẩm khác!'], 200);
                    }
                    OrderDetail::create([
                        'order_id' => $order_id,
                        'product_detail_id' => $item->product_detail_id,
                        'total' => $total,
                        'total_amount' => $total,
                        'quantity' => $item->quantity,
                        'price' => $item->price
                    ]);
                    if ($detail) {
                        $detail->quantity -= $item->quantity;
                        $detail->save();
                    }
                }

                CartDetail::where('cart_id', $cart->id)->delete();
                $cart->delete();

                // Lưu thông tin thanh toán nếu cần, ví dụ:
                // Payment::create(array_merge(['order_id' => $order_id], $paymentData));

                DB::commit();
                Mail::to($order->email)->queue(new OrderConfirm($order));

                return response()->json([
                    'success' => 'Mua hàng thành công'
                ], 201);

            } catch (\Exception $exception) {
                DB::rollBack();
                return response()->json([
                    'error' => 'Có lỗi khi tạo đơn hàng, vui lòng thử lại sau: ' . $exception->getMessage()
                ], 500);
            }
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $donhang = Order::with('user', 'OrderDetail.productDetail.product','OrderDetail.productDetail.productColor','OrderDetail.productDetail.productSize')->findOrFail($id);
        $trangthaidonhang = Order::TRANG_THAI_DON_HANG;
        return response()->json([
            'donhang' => $donhang,
            'trangthaidonhang' => $trangthaidonhang
        ], 200);

    }

    //    đây là trang sản phẩm khi người dùng click vào nút cập nhật đơn hàng
    public function update(Request $request, string $id)
    {
        $donHang = Order::query()->findOrFail($id);
        DB::beginTransaction();
        try {
            if ($request->has('huy_don_hang')) {
                if ($donHang->order_status == 'dang_van_chuyen') {
                    return response()->json([
                        'error' => 'Cập nhật không thành công'
                    ]);
                }else if($donHang->order_status == 'dang_chuan_bi'){
                    return response()->json([
                        'error' => 'Cập nhật không thành công'
                    ]);
                }else if($donHang->order_status == 'da_nhan_hang'){
                    return response()->json([
                        'error' => 'Cập nhật không thành công'
                    ]);
                }
                $donHang['order_status'] = Order::HUY_HANG;
                foreach ($donHang->OrderDetail as $item) {
                    $soluong = $item['quantity'];
                    $product_id = $item->product_detail_id;

                    $product_detail = ProductDetail::query()->where('id', $product_id)->first();
                    if ($product_detail) {
                        $product_detail->quantity += $soluong;
                        $product_detail->save();

                    } else {
                        return response()->json(['message' => 'Không tìm thấy sản phẩm']);
                    }
                }
                // $soluong = $donHang->OrderDetail->quantity;
                // $product_id =$donHang->OrderDetail->product_detail_id;

                $donHang->save();

                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Đơn hàng đã được hủy thành công.'
                ], 200);
            } else if ($request->has('da_nhan_hang')) {
                $donHang['order_status'] = Order::DA_NHAN_HANG;
                $donHang->save();
                DB::commit();
                return response()->json([
                    'success' => true,
                    'message' => 'Đơn hàng đã được đánh dấu là đã nhận.'
                ], 200);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi cập nhật đơn hàng.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function searchByOrderCode(Request $request)
{
    $query = $request->input('q', '');

    // Tìm kiếm theo mã đơn hàng (code_order)
    $orders = Order::where('code_order', 'like', '%' . $query . '%')->get();

    if ($orders->isEmpty()) {
        return response()->json(['message' => 'Không có đơn hàng nào'], 404);
    }

    return response()->json($orders);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    function generateUniqueOrderCode()
    {
        do {
            $code_order = 'ORD_' . Auth::id() . '_' . now()->timestamp;
        } while (Order::where('code_order', $code_order)->exists());
        return $code_order;
    }
}
