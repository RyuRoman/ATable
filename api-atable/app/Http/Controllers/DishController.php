<?php

namespace App\Http\Controllers;

use App\Models\Cooker;
use App\Models\Dish;
use App\Http\Requests\Request;

class DishController extends BaseController
{
    public function __construct(Dish $model)
    {
        $attributes = [
            "model" => $model,
            "canGet" => 'ALL',
            "canChange" => 'SELF',
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        $cooker = Cooker::find($item->cooker_id);
        return $cooker->user_id == $user->id;
    }

    public function cost_ascend()
    {
      return response()->json($this->model->orderBy('price', 'asc')->get(), 200);
    }
    public function cost_descend()
    {
      return response()->json($this->model->orderBy('price', 'desc')->get(), 200);
    }
    public function name_ascend()
    {
      return response()->json($this->model->orderBy('name', 'asc')->get(), 200);
    }
    public function name_descend()
    {
      return response()->json($this->model->orderBy('name', 'desc')->get(), 200);
    }
    public function time_ascend()
    {
      return response()->json($this->model->orderBy('preparation_time', 'asc')->get(), 200);
    }
    public function time_descend()
    {
      return response()->json($this->model->orderBy('preparation_time', 'desc')->get(), 200);
    }
    public function stock_ascend()
    {
      return response()->json($this->model->orderBy('expiration_date', 'asc')->get(), 200);
    }
    public function stock_descend()
    {
      return response()->json($this->model->orderBy('expiration_date', 'desc')->get(), 200);
    }
    public function shop_search($search)
    {
        return response()->json($this->model->where('name', $search)
                                            ->orwhere('price', $search)
                                            ->orwhere('description', $search)
                                            ->get(), 200);
    }
}
