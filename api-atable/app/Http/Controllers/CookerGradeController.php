<?php

namespace App\Http\Controllers;

use App\Models\CookerGrade;
use App\Models\Customer;

class CookerGradeController extends BaseController
{
    public function __construct(CookerGrade $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'ALL',
            "canChange" => 'SELF'
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        $customer = Customer::find($item->customer_id);
        return $customer->user_id == $user->id;
    }
}
