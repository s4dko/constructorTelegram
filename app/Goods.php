<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Goods extends Model
{
    protected  $table = '';

    protected $fillable = [
        'name', 'created_at', 'description', 'price'
    ];

    public function store(){
        return $this->belongsTo('App\Store');
    }
}
