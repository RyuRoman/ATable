<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public $table = 'customer';
    public $timestamps = true;

    protected $fillable = [
        'current_command_id',
        'user_id'
    ];
    protected $hidden = [];
}
