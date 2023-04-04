<?php

namespace App\Http\Controllers;

class AuthController extends Controller
{
    public function login()
    {
        return view('pages.auth.login');
    }

    public function register()
    {
        return view('pages.auth.register');
    }

    public function recover()
    {
        return view('pages.auth.recover');
    }
    public function reset($reset_token)
    {
        return view('pages.auth.reset', ["reset_token" => $reset_token]);
    }
    public function choice()
    {
        return view('pages.auth.choice');
    }
}
