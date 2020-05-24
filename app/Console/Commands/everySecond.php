<?php

namespace App\Console\Commands;

use App\Bot;
use App\CronUrl;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class everySecond extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bots:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gets all updated bots';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $count = 0;
        $lastOffset = 0;

//        while ($count < 30) {
//            $startTime =  Carbon::now();
        echo 'Bots update run';
        while(true){
            $gets = Bot::all()->toArray();
            foreach ($gets as $value) {
                $unique_id = $value['unique_id'];


                do{
                    $url = route('botsUpdates', ['idBot'=>$unique_id, 'offset'=>$lastOffset]);
                    $response = Http::get($url)->body();
                    $lastOffset = $response;
                }while( $response != "");

                if ( $response != ""){
                    $lastOffset = $response;
                }else{
                    $lastOffset = 0;
                }
            }


//            $endTime = Carbon::now();
//            $totalDuration = $endTime->diffInSeconds($startTime);
//            if($totalDuration > 0) {
//                $count +=  $totalDuration;
//            }
//            else {
//                $count++;
//            }
//            sleep(1);
        }

    }
}
