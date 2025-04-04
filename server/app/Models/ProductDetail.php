<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $table = 'product_details';
    protected $fillable = ['size_id', 'color_id', 'product_id', 'quantity'];

    public function productColor(){
        return $this->belongsTo(ProductColor::class, 'color_id');
    }
    public function productSize(){
        return $this->belongsTo(ProductSize::class, 'size_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
    public function orderDetail(){
        return $this->hasMany(OrderDetail::class);
    }
}
