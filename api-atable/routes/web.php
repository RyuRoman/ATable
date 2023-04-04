<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// emails showing
Route::get('/pwd_change', function() {
    return view('emails.pwd_change');
});

Route::get('/backoffice/login', 'BackoController@login');
Route::get('/backoffice/main', 'BackoController@main');
Route::get('/backoffice/users', 'BackoController@users');
