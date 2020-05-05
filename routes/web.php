<?php

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
Route::get('/gets', function(){
    $data = ['forms' => [
        ['form_1' => [
            'name' => 'Форма',
            'child' => [
                'label_1' => [
                    'text' => 'Мой текст'
                ],
                'button_1' => [
                    'name' => 'Кнопка 1',
                    'type' => 'goForm',
                    'data' => 'form_2'
                ]
            ]
        ]],
        ['form_2' => [
            'name' => 'Форма 2',
            'child' => [
                'label_1' => [
                    'text' => "Новый текст"
                ]
            ]
        ]]
    ]];

    return response()->json($data);
});

// react
Route::get('/{path?}', [
    'uses' => 'ReactController@show',
    'as' => 'react',
    'where' => ['path' => '.*']
]);
