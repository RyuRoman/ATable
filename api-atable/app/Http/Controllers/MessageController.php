<?php

namespace App\Http\Controllers;

use App\Models\Message;

class MessageController extends BaseController
{
    public function __construct(Message $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'SELF',
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        return $item->sender_user_id == $user->id || $item->receiver_user_id == $user->id;
    }
}
