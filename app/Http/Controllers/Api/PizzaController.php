<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PizzaController extends Controller
{
    public function index()
    {
        return \App\Models\Pizza::select('id','name','description','price','image_url')
            ->orderBy('id')->get();
    }
}
