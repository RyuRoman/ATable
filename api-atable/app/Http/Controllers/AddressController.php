<?php

namespace App\Http\Controllers;

use App\Models\Address;

class AddressController extends BaseController
{
    public function __construct(Address $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'ALL',
            "canChange" => 'SELF'
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        return $item->user_id == $user->id;
    }
}
