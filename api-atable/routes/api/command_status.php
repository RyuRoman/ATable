<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/command_status', 'CommandStatusController@index');
    Route::get('/command_status/{id}', 'CommandStatusController@show');
    Route::post('/command_status', 'CommandStatusController@store');
    Route::put('/command_status/{id}', 'CommandStatusController@update');
    Route::delete('/command_status/{id}', 'CommandStatusController@destroy');
});
