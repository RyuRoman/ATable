<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommandDish extends Model
{
    public $table = 'command_dish';
    public $timestamps = true;

    protected $fillable = [
        'price',
        'quantity',

        'command_id',
        'dish_id'
    ];
    protected $hidden = [];
}
