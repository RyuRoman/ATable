<?php

namespace App\Http\Controllers;

use App\Models\PasswordReset;

class PasswordResetController extends BaseController
{
    public function __construct(PasswordReset $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'SELF',
        ];

        parent::__construct($attributes);
    }
}
