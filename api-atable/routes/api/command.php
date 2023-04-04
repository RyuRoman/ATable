<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/command', 'CommandController@index');
    Route::get('/command/{id}', 'CommandController@show');
    Route::post('/command', 'CommandController@store');
    Route::put('/command/{id}', 'CommandController@update');
    Route::delete('/command/{id}', 'CommandController@destroy');
});
