<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class password_reset_token extends Model
{
    use HasFactory;
    protected $fillable=[
        'email',
        'token',
        'created_at'
    ];
    
    // so sánh xem 2 email cods giống nhau không
    public function user(){
        return $this->hasOne(User::class , 'email','email');
    }
    public function scopeCheckToken($q,$token){
        return $q->where('token',$token)->firstOrFail();
    }
}