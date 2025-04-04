<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class WishlistsDetail extends Model
{
    use HasFactory;
    protected $table = 'wishlists_details';
    protected $fillable = ['wishlist_id', 'product_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
