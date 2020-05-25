<?php

use App\User;
use Illuminate\Support\Facades\Route;

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
//
//Route::get('/', function () {
//    return view('welcome');
//});

//Auth::routes();


// user
Route::post('/login', 'AuthController@login')->name('login');
Route::post('/register', 'AuthController@register')->name('register');
Route::middleware('auth:api')->post('/logout', 'AuthController@logout')->name('logout');
Route::middleware('auth:api')->post('/user', 'AuthController@getAuthUser');

// bots
Route::middleware('auth:api')->post('/bot/create', 'BotController@create');
Route::middleware('auth:api')->post('/bot/get', 'BotController@getAll');
Route::middleware('auth:api')->post('/bot/save', 'BotController@save');
Route::middleware('auth:api')->post('/bot/settings/save', 'BotController@saveSettings');


Route::get('/test', 'BotController@test');

Route::get('/bots/{idBot}/getUpdates/{offset}', 'TelegramApiController@getUpdates')->name('botsUpdates');

// react
Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
]);
