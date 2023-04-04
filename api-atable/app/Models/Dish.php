<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    public $table = 'dish';
    public $timestamps = true;

    protected $fillable = [
        'name',
        'description',
        'price',
        'photo_path',
        'photo_content',
        'preparation_time',

        // Data to manually refresh
        'quantity',
        'expiration_date',

        'cooker_id',
        'address_id',
        'dish_category_id'
    ];

    protected $hidden = [];
}
