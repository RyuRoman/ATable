<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    public $table = 'message';
    public $timestamps = true;

    protected $fillable = [
        'content',

        'sender_user_id',
        'receiver_user_id'
    ];
    protected $hidden = [];
}
