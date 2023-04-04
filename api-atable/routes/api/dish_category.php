<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/dish_category', 'DishCategoryController@index');
    Route::get('/dish_category/{id}', 'DishCategoryController@show');
    Route::post('/dish_category', 'DishCategoryController@store');
    Route::put('/dish_category/{id}', 'DishCategoryController@update');
    Route::delete('/dish_category/{id}', 'DishCategoryController@destroy');
});
