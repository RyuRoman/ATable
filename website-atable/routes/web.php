<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'AuthController@login');

Route::get('/geolocIP', 'TestController@geolocIP');
Route::get('/geolocaddress', 'TestController@geolocadd');
Route::get('/geolocPHP', 'TestController@geolocPHP');

Route::get('/landing', 'HomeController@landing');
Route::get('/blogsingle', 'HomeController@blogsingle');
Route::get('/cart', 'HomeController@cart');
Route::get('/checkout', 'HomeController@checkout');
Route::get('/contact', 'HomeController@contact');
Route::get('/productsingle', 'HomeController@productsingle');
Route::get('/shop', 'HomeController@shop');
Route::get('/wishlist', 'HomeController@wishlist');
Route::get('/profil', 'HomeController@profil');
Route::get('/description', 'HomeController@description');
Route::get('/dish', 'HomeController@dish');
Route::get('/add_dish', 'HomeController@dish');
Route::get('/dodo', 'HomeController@dodo');
Route::get('/my_past_orders', 'HomeController@my_past_orders');
Route::get('/my_current_orders', 'HomeController@my_current_orders');

Route::get('/login', 'AuthController@login');
Route::get('/register', 'AuthController@register');
Route::get('/recover', 'AuthController@recover');
Route::get('/reset/{reset_token}', 'AuthController@reset')->name('reset');
Route::get('/choice', 'AuthController@choice');

Route::get('/main', 'MainPageController@mainpage');
