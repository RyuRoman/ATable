<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AtableStat extends Model
{
    public $table = 'atable_stat';
    public $timestamps = true;

    protected $fillable = [
        'website_entries',
        'nb_commands',

        'mvp_cooker_id'
    ];

    protected $hidden = [];

    public function mvpCooker() {
        return $this->hasOne('App\Models\Cooker', 'mvp_cooker_id', 'id');
    }
}
