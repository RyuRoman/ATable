<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/cooker_grade', 'CookerGradeController@index');
    Route::get('/cooker_grade/{id}', 'CookerGradeController@show');
    Route::post('/cooker_grade', 'CookerGradeController@store');
    Route::put('/cooker_grade/{id}', 'CookerGradeController@update');
    Route::delete('/cooker_grade/{id}', 'CookerGradeController@destroy');
});
