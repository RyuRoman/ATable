const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.combine([
    'resources/js/cart.js',
], 'public/js/cart.js');

mix.combine([
    'resources/js/dish.js',
], 'public/js/dish.js');

mix.combine([
    'resources/js/icons.js',
], 'public/js/icons.js');

mix.combine([
    'resources/js/login.js',
], 'public/js/login.js');

mix.combine([
    'resources/js/logout.js',
], 'public/js/logout.js');

mix.combine([
    'resources/js/main.js',
], 'public/js/main.js');

mix.combine([
    'resources/js/my_current_orders.js',
], 'public/js/my_current_orders.js');

mix.combine([
    'resources/js/my_past_orders.js',
], 'public/js/my_past_orders.js');

mix.combine([
    'resources/js/profil.js',
], 'public/js/profil.js');

mix.combine([
    'resources/js/range.js',
], 'public/js/range.js');

mix.combine([
    'resources/js/redirect.js',
], 'public/js/redirect.js');

mix.combine([
    'resources/js/register.js',
], 'public/js/register.js');

mix.combine([
    'resources/js/shop.js',
], 'public/js/shop.js');

mix.combine([
    'resources/js/single.js',
], 'public/js/single.js');

//mix.js('resources/js/app.js', 'public/js')
//    .sass('resources/sass/app.scss', 'public/css');
