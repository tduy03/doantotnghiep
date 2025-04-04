<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'name',
        'price',
        'price_sale',
        'discount_id',
        'image',
        'description',
        'content',
        'view',
        'is_sale',
        'is_hot',
        'is_show_home',
        'is_active',
        'product_code',
        'sub_category_id'
    ];
    public function discount()
{
    return $this->belongsTo(Discount::class, 'discount_id');
}
    public function ProductDetail(){
        return $this->hasMany(ProductDetail::class);
    }


    public function SubCate(){
        return $this->belongsTo(SubCategory::class,'sub_category_id');
    }
    public function images(){
        return $this->hasMany(Image::class,'product_image_id');
    }
}
