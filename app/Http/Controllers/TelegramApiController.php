<?php


namespace App\Http\Controllers;

use App\Bot;
use TuriBot\Client;

class TelegramApiController
{
    # api
    private $chat_id = null;
    private $callback_id = null;
    private $client = null;

    # bot
    private $data;

    # event
    private $eventButtons = [];

    public function getUpdates($idBot, $offset)
    {
        $bot = Bot::where(['unique_id' => $idBot])->first();
        $token = $bot->token;
        $this->data = (object)json_decode($bot->data);


//dd( $this->showForm($data, 'form_2') );


        $this->client = new Client($token);
        //$offset = 0;

//        while (true) {
        $updates = $this->client->getUpdates($offset, $timeout = 0);
        if ($updates->ok == true) {
            foreach ($updates->result as $update) {
                $offset = $update->update_id + 1;
                $easy = new \TuriBot\EasyVars($update);

                $commands = $this->formToCommand();

                if (isset($update->message)) {
                    $this->chat_id = $update->message->chat->id;
                    if (isset($update->message->reply_to_message->from->id)) {
                        $reply_id = $update->message->reply_to_message->from->id;
                    }


                    foreach ($commands as $value ){
                        if ( $easy->text == $value['command']){
                            $this->showForm($value['form_id']);
                        }
                    }
//                    if ($easy->text === "/form1") {
//                        $this->showForm('form_1');
//                        $client->sendMessage($chat_id, "ping");
//                        $client->sendMessage($chat_id, "pong");
//                        $client->sendMessage($chat_id, "pong2");
//                        $client->debug($chat_id, $easy);
//                        $client->debug($chat_id, $updates);
//                        $client->forwardMessage($chat_id, $chat_id, null, $easy->message_id);
//                        $client->sendPhoto($chat_id, $client->inputFile(public_path('/bots/XEKQ5-TfiuY-Quafo/image.jpg')), "File upload");
//                    }
//                    if ($easy->text === "/form2") {
//                        $this->showForm('form_2');
//                    }

//                    if ($easy->text === "/help") {
//                        $menu["inline_keyboard"] = [
//                            [
//                                [
//                                    "text" => "Button 1",
//                                    "callback_data" => "btn1",
//                                ],
//                            ],
//                            [
//                                [
//                                    "text" => "Button 2",
//                                    "callback_data" => "btn2",
//                                ],
//                                [
//                                    "text" => "Button 3",
//                                    "callback_data" => "btn3",
//                                ],
//                            ],
//                        ];
//
//                        $a = $client->sendMessage($chat_id, "help", null, null, null, null, $menu);
//                    }

//                    if ($easy->text === "ping") {
//                        $client->sendMessage($chat_id, "ggg");
//                    } else {
//                        $client->sendMessage($chat_id, $easy->message_id);
//                    }

//                    if ($easy->text === "test") {
//                        $result = $client->sendMessage($chat_id, "test");
//                        //$client->debug($chat_id, $result);
//                    }
                    //$client->sendPhoto($chat_id, $client->inputFile("photo.png"));

//                    if ($easy->text === "/mute" and isset($reply_id)) {
//                        $perm = [
//                            "can_send_messages" => false
//                        ];
//                        $result = $client->restrictChatMember($chat_id, $reply_id, $perm);
//                        $client->debug($chat_id, $result);
//                    }
                }


                if (isset($update->callback_query)) {
//                    foreach ($this->eventButtons as $nameButton => $idForm) {
                        if ($update->callback_query->data ) {
                            $this->chat_id = $update->callback_query->message->chat->id;

                            $this->showForm($update->callback_query->data);
                            $this->client->answerCallbackQuery($update->callback_query->id, "Done!");
                        }
//                    }

                }
//
//                    $id = $update->callback_query->id;
//                    $message_chat_id = $update->callback_query->message->chat->id;
//                    $message_message_id = $update->callback_query->message->message_id;
//
//                    $menu["inline_keyboard"] = [
//                        [
//                            [
//                                "text"          => "Button 1",
//                                "callback_data" => "btn1",
//                            ],
//                        ],
//                        [
//                            [
//                                "text"          => "Button 2",
//                                "callback_data" => "btn2",
//                            ],
//                            [
//                                "text"          => "Button 3",
//                                "callback_data" => "btn3",
//                            ],
//                        ],
//                    ];
//
//                    if ($update->callback_query->data === "btn1") {
//                        $client->answerCallbackQuery($id, "Button 122");
//                        $client->editMessageText($message_chat_id, $message_message_id, null, "Button 1", null, null, $menu);
//                    } elseif ($update->callback_query->data === "btn2") {
//                        $client->answerCallbackQuery($id, "Button 2");
//                        $client->editMessageText($message_chat_id, $message_message_id, null, "Button 2", null, null, $menu);
//                    } elseif ($update->callback_query->data === "btn3") {
//                        $client->answerCallbackQuery($id, "Button 3");
//                        $client->editMessageText($message_chat_id, $message_message_id, null, "Button 3", null, null, $menu);
//                    }
//                }



//                } elseif (isset($update->inline_query)) {
//                    $out = (string)rand();
//                    $results[] = [
//                        "type" => "article",
//                        "id" => $out,
//                        "title" => $out,
//                        "input_message_content" => [
//                            "message_text" => $out,
//                            "disable_web_page_preview" => true
//                        ],
//                    ];
//                    $client->answerInlineQuery($update->inline_query->id, $results, 1, false);
//                    unset($results);
//                }
                return $offset;
            }
        } else {
            exit($updates->description);
        }
    }

    private function formToCommand(){
        $res = [];

        foreach($this->data->forms as $key => $value){
            foreach ( $value as $nameForm => $secondValue){
                if ( isset( $secondValue->command) and $secondValue->command != ""){
                    $res[] = ['form_id' => $nameForm, 'command' => $secondValue->command ];
                }
            }
        }

        return $res;
    }

    private function showForm($form_id ){
        $currentForm = null;
        $menu = null;

        $sendMessageParams = [
            'id' => $this->chat_id,
            'text' => null,
            'parse_mode' => null,
            'disable_web_page_preview' => null,
            'disable_notification' => null,
            'reply_to_message_id' => null,
            'reply_markup' => null
        ];

        # find form
        foreach($this->data->forms as $key => $value){
            foreach ( $value as $nameForm => $secondValue){
                if ( $nameForm == $form_id){
                    $currentForm = $this->data->forms[$key]->{$nameForm};
                    break;
                }
            }
        }


        # components
        if ( $currentForm !== null){
            foreach ( $currentForm->child as $nameComponent => $properties ){
                $nameComponent = explode('_', $nameComponent)[0];
                switch ( $nameComponent ){
                    case 'label':
                        $sendMessageParams['text'] = $properties->text;
//                        $this->client->sendMessage($this->chat_id, $properties->text );
                        break;
                    case 'inlineButtons':
                        foreach( $properties->buttons as $nameButton => $props){
                            $menu["inline_keyboard"][][] = [
                                'text' => $props->name,
                                'callback_data' => $props->data//$nameButton
                            ];
                            $this->eventButtons[$nameButton] = $props->data; // button => form
                        }
                        $sendMessageParams['reply_markup'] = $menu;
//                        print_r( $menu );
                        break;
                }
            }

            $this->client->sendMessage($sendMessageParams['id'], $sendMessageParams['text'], null, null, null, null, $sendMessageParams['reply_markup']);
            return true;
        }

        return $currentForm;
    }


}