<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'categories';
    protected $fillable = ['name', 'slug'];

    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
    public function products()
    {
        return $this->hasManyThrough(Product::class, SubCategory::class);
    }

}
