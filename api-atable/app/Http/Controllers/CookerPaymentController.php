<?php

namespace App\Http\Controllers;

use App\Models\Cooker;
use App\Models\CookerPayment;

class CookerPaymentController extends BaseController
{
    public function __construct(CookerPayment $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'NONE',
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        $cooker = Cooker::find($item->cooker_id);
        return $cooker->user_id == $user->id;
    }
}
