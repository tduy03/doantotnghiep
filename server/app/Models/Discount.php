<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;

    protected $table = 'discounts';
    protected $fillable = ['sub_category_id', 'discount_percent', 'is_active','expires_at'];

    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }
}
