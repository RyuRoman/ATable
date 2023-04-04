<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/customer', 'CustomerController@index');
    Route::get('/customer/{id}', 'CustomerController@show');
    Route::post('/customer', 'CustomerController@store');
    Route::put('/customer/{id}', 'CustomerController@update');
    Route::delete('/customer/{id}', 'CustomerController@destroy');
});
