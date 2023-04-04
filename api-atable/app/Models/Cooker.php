<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cooker extends Model
{
    public $table = 'cooker';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'delivery'
    ];
    protected $hidden = [];
}
