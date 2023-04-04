<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordResetNotifyRequest;
use App\Http\Requests\PasswordResetSaveRequest;
use App\Mail\PasswordResetMail;
use App\Models\PasswordReset;
use App\Models\User;
use App\Http\Requests\AuthRequest;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserController extends BaseController
{
    public function __construct(User $model) {
        $attributes = [
            "model" => $model,
            "canGet" => 'ALL',
            "canChange" => 'SELF',
        ];

        parent::__construct($attributes);
    }

    public function isUserData($item, $user) {
        return $item->id == $user->id;
    }


    public function store(Request $request)
    {
        return response()->json(["error" => ["Use register route to store user in the database."]], 500);
    }

    public function login(AuthRequest $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $token = Hash::make(uniqid());
            User::where('email', $request['email'])
                ->update(['remember_token' => $token]);
            return response()->json(['bearerToken' => $token], 200);
        }

        return response()->json("Wrong credentials", 401);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        if (User::where('remember_token', $token)->update(['remember_token' => null]))
            return response()->json("OK", 200);
        return response()->json("User unknown", 200);
    }

    public function register(AuthRequest $request) {
        $user = User::create([
            'first_name' => $request['first_name'],
            'last_name' => $request['last_name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password'])
        ]);

        return self::login($request);
    }

    public function current(Request $request)
    {
        $token = request()->bearerToken();
        $user = User::where('remember_token', $token)->first();
        return response()->json($user, 200);
    }

    public function currentWithEmail(Request $request)
    {
        $user = $this->model->where('email', $request['email'])->first();
        if (!$user)
            return response()->json(["Adresse email inexistante"], 422);
        return response()->json($user, 200);
    }


    public function passwordResetNotify(PasswordResetNotifyRequest $request) {
        $user = User::where("email", $request["email"])->first();
        $token = uniqid();
        $limit = Carbon::now();
        $limit->add(8, 'days');

        $user->reset_pwd_token = $token;
        $user->reset_pwd_token_expiration_date = $limit->toDateString();

        Mail::to($user->email)->send(new PasswordResetMail($user));
        $user->save();
        //$user->notify();

        return response()->json("OK");
    }

    public function passwordResetSave(PasswordResetSaveRequest $request) {
        $user = User::where("reset_pwd_token", $request["token"])->first();

        $user->password = Hash::make($request['password']);
        $user->reset_pwd_token = null;
        $user->reset_pwd_token_expiration_date = null;

        $user->save();
        return response()->json("OK");
    }

}
