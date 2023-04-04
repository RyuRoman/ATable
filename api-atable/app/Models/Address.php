<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    public $table = 'address';
    public $timestamps = true;

    protected $fillable = [
        'street_number',
        'street',
        'postal_code',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'is_active',

        'user_id'
    ];

    protected $hidden = [];

    public function user() {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
