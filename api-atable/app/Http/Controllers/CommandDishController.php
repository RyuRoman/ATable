<?php

namespace App\Http\Controllers;

use App\Models\Command;
use App\Models\CommandDish;
use App\Models\Cooker;
use App\Models\Customer;
use App\Models\Dish;

class CommandDishController extends BaseController
{
    public function __construct(CommandDish $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'SELF',
            "canChange" => 'SELF'
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        // This case is exception
        // 2 columns are linked to 2 different users
        // leading to 2 different paths

        $command = Command::find($item->command_id);
        $customer = Customer::find($command->customer_id);

        $dish = Dish::find($item->dish_id);
        $cooker = Cooker::find($dish->cooker_id);

        return $cooker->user_id == $user->id || $customer->user_id == $user->id;

    }
}
