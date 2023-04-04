<?php

namespace App\Http\Controllers;

use App\Models\DishCategory;

class DishCategoryController extends BaseController
{
    public function __construct(DishCategory $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'ALL',
            "canChange" => 'NONE',
        ];

        parent::__construct($attributes);
    }
}
