<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    protected $fillable = [
        'name', 'type', 'avatar', 'data', 'user_id','unique_id', 'created_at'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
