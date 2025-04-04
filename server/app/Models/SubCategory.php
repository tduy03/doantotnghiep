<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubCategory extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'sub_categories';
    protected $fillable = ['name', 'image', 'status', 'category_id'];
    public function product(){
        return $this->hasMany(Product::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

     // Một SubCategory có nhiều Product
     public function products()
     {
         return $this->hasMany(Product::class);
     }
}
