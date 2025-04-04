<?php

namespace App\Models;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'comments';
    protected $fillable = ['comment', 'rating', 'user_id', 'product_id', 'parent_id', 'status'];
    // Định nghĩa mối quan hệ với bình luận cha
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    // Định nghĩa mối quan hệ với các bình luận con
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // Mối quan hệ với người dùng
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Mối quan hệ với sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
