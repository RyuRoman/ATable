<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/refund', 'RefundController@index');
    Route::get('/refund/{id}', 'RefundController@show');
    Route::post('/refund', 'RefundController@store');
    Route::put('/refund/{id}', 'RefundController@update');
    Route::delete('/refund/{id}', 'RefundController@destroy');
});
