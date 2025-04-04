<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory,SoftDeletes;

    const TRANG_THAI_DON_HANG = [
        'cho_xac_nha' => 'Chờ xác nhận',
        'da_xac_nha' => 'Đã xác nhận',
        'dang_chuan_bi' => 'Đang chuẩn bị',
        'dang_van_chuyen' => 'Đang vận chuyển',
        'da_nhan_hang' => 'Đã nhận hàng',
        'huy_hang' => 'Hủy hàng',
    ];

    const TRANG_THAI_THANH_TOAN = [
        'chua_thanh_toan' => 'Chưa thanh toán',
        'da_thanh_toan' => 'Đã thanh toán',
    ];

    const CHO_XAC_NHA = 'cho_xac_nha';
    const DA_XAC_NHA = 'da_xac_nha';
    const DANG_CHUAN_BI = 'dang_chuan_bi';
    const DANG_VAN_CHUYEN = 'dang_van_chuyen';
    const DA_NHAN_HANG = 'da_nhan_hang';
    const HUY_HANG = 'huy_hang';
    const CHUA_THANH_TOAN = 'chua_thanh_toan';
    const DA_THANH_TOAN = 'da_thanh_toan';
    protected $table = 'orders';

    protected $fillable = [
        'code_order',
        'user_id',
        'username',
        'phone',
        'address',
        'email',
        'note',
        'order_status',
        'order_payment',
        'commodity_money',
        'total_amount',
        'shipping_id',
        'promotion_id',
        'vnpayy_id'
    ];
    public function OrderDetail()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function shipping(){
        return $this->hasOne(Shipping::class,'id','shipping_id');
    }
}
