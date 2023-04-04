<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Command extends Model
{
    public $table = 'command';
    public $timestamps = true;

    protected $fillable = [
        'price',

        'customer_id',
        'command_status_id',
    ];

    protected $hidden = [];

    public function customer() {
        return $this->hasOne('App\Models\Customer', 'customer_id', 'id');
    }

    public function commandStatus() {
        return $this->hasOne('App\Models\CommandStatus', 'command_status_id', 'id');
    }
}
