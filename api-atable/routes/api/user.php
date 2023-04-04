<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/user/current', 'UserController@current');

    Route::get('/user', 'UserController@index');
    Route::get('/user/{id}', 'UserController@show');
    Route::post('/user', 'UserController@store');
    Route::put('/user/{id}', 'UserController@update');
    Route::delete('/user/{id}', 'UserController@destroy');
});

Route::get('/user/current/{email}', 'UserController@currentWithEmail');
Route::post('/user/login', 'UserController@login');
Route::post('/user/logout', 'UserController@logout');
Route::post('/user/register', 'UserController@register');
Route::post('/user/reset', 'UserController@reset');

Route::post('/password_reset/notify', 'UserController@passwordResetNotify');
Route::post('/password_reset/save', 'UserController@passwordResetSave');
