<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;
    protected $table = 'promotions';
    protected $fillable = [
        'code',
        'discount',
        'discount_type',
        'minimum_spend',
        'start_date',
        'end_date',
        'usage_limit',
        'status'
    ];
}
