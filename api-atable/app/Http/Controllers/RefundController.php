<?php

namespace App\Http\Controllers;

use App\Models\Refund;

class RefundController extends BaseController
{
    public function __construct(Refund $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'NONE',
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        return $item->user_id == $user->id;
    }
}
