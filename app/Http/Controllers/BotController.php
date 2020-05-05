<?php

namespace App\Http\Controllers;

use App\Bot;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BotController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'type' =>'required',
            'name' =>'required',
        ] );

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()->toArray()]);
        }


        $unique_id = $this->generateUniqueId();
        $bot = Bot::create([
            'name' => $request->name,
            'type' => $request->type,
            'user_id' => $request->user()->id,
            'unique_id' => $unique_id
        ]);

        return $this->getAll();
    }

    public function getAll(){
        $bots = Bot::all();
        foreach ( $bots as $key => $value ){
            $bots[$key]->date = $value->created_at->diffForHumans();
        }


        return response()->json(['status' => 200, 'result'=> ['count' => count($bots), 'list' => $bots ]] );
    }

    public function generateUniqueId(){
        $res = '';
        $arr = array_merge( range('A','Z'), range('0', '9'), range('a','z') );
        for( $i=0; $i<3; $i++){
            $group = '';
            for( $j=0; $j<5; $j++){
                $group .= $arr[ array_rand($arr) ];
            }
            if ( $i != 2)
                $res .= $group.'-';
            else
                $res .= $group;
        }

        return $res;
    }
}
