<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    protected  $table = '';

    protected $fillable = [
        'name', 'category_id', 'data'
    ];

    public function bot(){
        return $this->belongsTo('App\Bot');
    }
}
