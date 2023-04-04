<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBankDetails extends Model
{
    public $table = 'user_bank_details';
    public $timestamps = true;

    protected $fillable = [
        'rib',
        'iban',
        'bic',
        'cryptogram',
        'expiration_date',
        'is_active',

        'user_id'
    ];

    protected $hidden = [];

    public function user() {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
