<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    public $table = 'refund';
    public $timestamps = true;

    protected $fillable = [
        'amount',
        'description',

        'user_id',
        'admin_id', // user_id
    ];
    protected $hidden = [];
}
