<?php

namespace App\Http\Controllers;

class MainPageController extends Controller
{
    public function mainpage()
    {
        return view('pages.main');
    }
}
