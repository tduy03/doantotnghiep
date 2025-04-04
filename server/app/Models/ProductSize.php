<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;
    protected $table = 'product_sizes';
    protected $fillable = ['name'];
    public function productDetails()
    {
        return $this->hasMany(ProductDetail::class);
    }
}
