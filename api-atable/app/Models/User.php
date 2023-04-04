<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    public $table = 'user';
    public $timestamps = true;

    protected $fillable = [
        'displayable_name',
        'first_name',
        'last_name',
        'date_of_birth',
        'gender',
        'phone',
        'email',
        'description',
        'password',

        'customer_id',
        'cooker_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'is_admin',
        'reset_pwd_token',
        'reset_pwd_token_expiration_date'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function address() {
        return $this->hasMany('App\Models\Address', 'user_id', 'id');
    }

    public function routeNotificationForMail()
    {
        return $this->email;
    }
}
