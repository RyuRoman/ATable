<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CookerPayment extends Model
{
    public $table = 'cooker_payment';
    public $timestamps = true;

    protected $fillable = [
        'amount',

        'cooker_id',
        'command_id'
    ];
    protected $hidden = [];
}
