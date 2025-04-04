<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Wishlists_detail;

class Wishlist extends Model
{
    use HasFactory;
    protected $table = 'wishlists';
    protected $fillable = ['user_id'];

    public function wishlistDetails()
    {
        return $this->hasMany(WishlistsDetail::class);
    }
}
