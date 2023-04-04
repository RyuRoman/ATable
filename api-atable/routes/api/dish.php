<?php

Route::group(['middleware' => 'authkey'], function() {
    Route::get('/dish', 'DishController@index');
    Route::get('/dish/{id}', 'DishController@show');
    Route::post('/dish', 'DishController@store');
    Route::put('/dish/{id}', 'DishController@update');
    Route::delete('/dish/{id}', 'DishController@destroy');
});

Route::get('/cost_ascend', 'DishController@cost_ascend');
Route::get('/cost_descend', 'DishController@cost_descend');
Route::get('/name_ascend', 'DishController@name_ascend');
Route::get('/name_descend', 'DishController@name_descend');
Route::get('/time_ascend', 'DishController@time_ascend');
Route::get('/time_descend', 'DishController@time_descend');
Route::get('/stock_ascend', 'DishController@stock_ascend');
Route::get('/stock_descend', 'DishController@stock_descend');

Route::get('/shop_search/{search}', 'DishController@shop_search');
