<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $table = 'roles';
    protected $fillable = ['name'];

    public function userRoles()
    {
        return $this->hasMany(UserRole::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }
}
