<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/user_bank_details', 'UserBankDetailsController@index');
    Route::get('/user_bank_details/{id}', 'UserBankDetailsController@show');
    Route::post('/user_bank_details', 'UserBankDetailsController@store');
    Route::put('/user_bank_details/{id}', 'UserBankDetailsController@update');
    Route::delete('/user_bank_details/{id}', 'UserBankDetailsController@destroy');
});
