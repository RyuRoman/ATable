<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/address', 'AddressController@index');
    Route::get('/address/{id}', 'AddressController@show');
    Route::post('/address', 'AddressController@store');
    Route::put('/address/{id}', 'AddressController@update');
    Route::delete('/address/{id}', 'AddressController@destroy');
});
