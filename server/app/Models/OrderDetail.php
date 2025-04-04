<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    protected $table = 'order_details';
    protected $fillable = ['order_id', 'product_detail_id', 'price', 'quantity', 'total_amount'];
    public function Order(){
        return $this->belongsTo(Order::class);
    }
    public function productDetail()
    {
        return $this->belongsTo(ProductDetail::class, 'product_detail_id','id');
    }
}