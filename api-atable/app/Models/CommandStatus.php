<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommandStatus extends Model
{
    public $table = 'command_status';
    public $timestamps = false;

    protected $fillable = [
        'status'
    ];

    protected $hidden = [];
}
