<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PizzaController;
use App\Http\Controllers\Api\OrderController;

Route::get('/pizzas', [PizzaController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);