<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    private $attributes; // class child data

    protected $model; // Address, User, Dish ...
    protected $user; // Auth user object (with data)

    protected $userKey; // value in table in column [$userKeyType]
    protected $userKeyType; // 'user_id', 'cooker_id', 'customer_id', null

    protected $userIsAdmin;

    // To know if a non admin can get/change the model's data
    protected $canGetAll;
    protected $canGetSelf;
    // -> Simple user cannot change all
    protected $canChangeSelf;

    public function __construct($attributes)
    {
        $this->attributes = $attributes;

        $this->model = self::getAttribute("model");

        $canGet = self::getAttribute("canGet");
        $canChange = self::getAttribute("canChange");
        $this->canGetAll = !strcmp($canGet, "ALL");
        $this->canGetSelf = !strcmp($canGet, "SELF");
        $this->canChangeSelf = !strcmp($canChange, "SELF");

        $this->user = User::where('remember_token', request()->bearerToken())->first();
        $this->userIsAdmin = $this->user ? $this->user->is_admin : false;
    }

    public function getAttribute($attributeName) {
        return array_key_exists($attributeName, $this->attributes) ? $this->attributes[$attributeName] : null;
    }

    // Function to override in each Controller
    public function isUserData($item, $user) {
        return false;
    }
    public function dontCareUserData($item, $user) {
        return true;
    }


    public function index()
    {
        if ($this->userIsAdmin || $this->canGetAll) {

            $data = $this->model->get();

        } else if ($this->canGetSelf) {

            $data = $this->model->where($this->userKeyType, $this->userKey)->get();

        } else {

            throw new HttpResponseException(response()->json(['message' => "Auth user cannot read any kind of this data."], 403));

        }

        return response()->json($data, 200);
    }


    public function show($id)
    {
        if ($this->userIsAdmin || $this->canGetAll) {

            $item = $this->model->find($id);

        } else if ($this->canGetSelf) {

            $item = $this->model->find($id);

            if (!$this->dontCareUserData($item, $this->user))
                throw new HttpResponseException(response()->json(['message' => "Auth user cannot get others data."], 403));

        } else {

            throw new HttpResponseException(response()->json(['message' => "Auth user cannot read any kind of this data."], 403));

        }

        return response()->json($item, 200);
    }


    public function store(Request $request)
    {
        if (!$this->userIsAdmin && !$this->canChangeSelf)
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot store any kind of this data."], 403));

        $item = new $this->model;
        $item->fill($request->all());

        if (!$this->userIsAdmin && !$this->dontCareUserData($item, $this->user))
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot store data for others."], 403));

        $item->save();
        return response()->json($item, 200);
    }


    public function update(Request $request, $id)
    {
        if (!$this->userIsAdmin && !$this->canChangeSelf)
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot update any kind of this data."], 403));

        $item = $this->model->find($id);

        if (!$this->userIsAdmin && !$this->dontCareUserData($item, $this->user))
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot update others data."], 403));


        $item->fill($request->all());
        $item->save();
        return response()->json($item, 200);
    }


    public function destroy($id)
    {
        if (!$this->userIsAdmin && !$this->canChangeSelf)
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot delete any kind of this data."], 403));

        $item = $this->model->find($id);

        if (!$this->userIsAdmin && !$this->dontCareUserData($item, $this->user))
            throw new HttpResponseException(response()->json(['message' => "Auth user cannot delete others data."], 403));

        $item->delete();
        return response()->json("OK", 200);
    }
}
