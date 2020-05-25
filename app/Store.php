<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected  $table = '';

    protected $fillable = [
        'name', 'created_at', 'updated_at', 'goods_id'
    ];

    public function goods(){
        return $this->belongsTo('App\Good');
    }
}
