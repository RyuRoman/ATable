<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/cooker_payment', 'CookerPaymentController@index');
    Route::get('/cooker_payment/{id}', 'CookerPaymentController@show');
    Route::post('/cooker_payment', 'CookerPaymentController@store');
    Route::put('/cooker_payment/{id}', 'CookerPaymentController@update');
    Route::delete('/cooker_payment/{id}', 'CookerPaymentController@destroy');
});
