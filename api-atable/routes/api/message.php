<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/message', 'MessageController@index');
    Route::get('/message/{id}', 'MessageController@show');
    Route::post('/message', 'MessageController@store');
    Route::put('/message/{id}', 'MessageController@update');
    Route::delete('/message/{id}', 'MessageController@destroy');
});
