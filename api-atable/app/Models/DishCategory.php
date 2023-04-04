<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishCategory extends Model
{
    public $table = 'dish_category';
    public $timestamps = false;

    protected $fillable = [
        'category'
    ];

    protected $hidden = [];
}
