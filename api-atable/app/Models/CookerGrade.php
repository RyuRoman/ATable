<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CookerGrade extends Model
{
    public $table = 'cooker_grade';
    public $timestamps = true;

    protected $fillable = [
        'grade',
        'comment',

        'customer_id',
        'cooker_id'
    ];

    protected $hidden = [];
}
