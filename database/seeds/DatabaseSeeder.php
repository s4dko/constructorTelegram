<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $data = ['forms' => [
            ['form_1' => [
                'name' => '/start',
                'command' => '/start',
                'top' => 0,
                'left' => 0,
                'child' => [
                    'label_1' => [
                        'text' => 'Мой текст'
                    ],
                    'inlineButtons_1' => [
                        'buttons' => [
                            'btn_1' => [
                                'name' => 'Кнопка 2',
                                'type' => 'goForm',
                                'data' => 'form_2'
                            ],
                            'btn_2' => [
                                'name' => 'Кнопка 2',
                                'type' => 'goForm',
                                'data' => 'form_3'
                            ]
                        ]

                    ]
                ]
            ]],
            ['form_2' => [
                'name' => 'Форма 2',
                'command' => '',
                'top' => 0,
                'left' => 230,
                'child' => [
                    'label_1' => [
                        'text' => "Новый текст"
                    ]
                ]
            ]]
        ]];

        DB::table('users')->insert([
            'id' => 1,
            'name' => 's4dko',
            'email' => 's4dko@gmail.com',
            'avatar' => '1.jpg',
            'password' => Hash::make('123456'),
            'created_at' => '2018-02-01 00:00:00',
            'updated_at' => '2018-02-01 00:00:00'
        ]);

        DB::table('bots')->insert([
            'name' => 'My first bots',
            'type' => 'default',
            'data' => json_encode( (object)$data ),
            'avatar' => '',
            'user_id' => 1,
            'unique_id' => 'XEKQ5-TfiuY-Quafo',
            'created_at' => '2018-02-01 00:00:00',
            'updated_at' => '2018-02-01 00:00:00'
        ]);


    }
}
