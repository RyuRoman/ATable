<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\Customer;

class CommandController extends BaseController
{
    public function __construct(Command $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'SELF'
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        $customer = Customer::find($item->customer_id);
        return $customer->user_id == $user->id;
    }
}
