<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/command_dish', 'CommandDishController@index');
    Route::get('/command_dish/{id}', 'CommandDishController@show');
    Route::post('/command_dish', 'CommandDishController@store');
    Route::put('/command_dish/{id}', 'CommandDishController@update');
    Route::delete('/command_dish/{id}', 'CommandDishController@destroy');
});
