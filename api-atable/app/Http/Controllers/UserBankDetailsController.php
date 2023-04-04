<?php

namespace App\Http\Controllers;

use App\Models\UserBankDetails;

class UserBankDetailsController extends BaseController
{
    public function __construct(UserBankDetails $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'SELF'
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        return $item->user_id == $user->id;
    }
}
