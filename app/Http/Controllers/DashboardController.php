<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function __construct(){
        $this->middleware('auth:api');
    }

    public function getData(){
        return response()->json(['data'=> 'lalalala']) ;
    }
}
