<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/atable_stat', 'AtableStatController@index');
    Route::get('/atable_stat/{id}', 'AtableStatController@show');
    Route::post('/atable_stat', 'AtableStatController@store');
    Route::put('/atable_stat/{id}', 'AtableStatController@update');
    Route::delete('/atable_stat/{id}', 'AtableStatController@destroy');
});
