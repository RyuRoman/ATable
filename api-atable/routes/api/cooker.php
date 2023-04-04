<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/cooker', 'CookerController@index');
    Route::get('/cooker/{id}', 'CookerController@show');
    Route::post('/cooker', 'CookerController@store');
    Route::put('/cooker/{id}', 'CookerController@update');
    Route::delete('/cooker/{id}', 'CookerController@destroy');
});
