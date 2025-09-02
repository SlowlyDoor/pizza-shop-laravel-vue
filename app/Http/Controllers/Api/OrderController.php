<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(\App\Http\Requests\StoreOrderRequest $request)
    {
        $items = collect($request->input('items', []));
        $pizzas = \App\Models\Pizza::whereIn('id', $items->pluck('pizza_id'))->get()->keyBy('id');

        $normalized = $items->map(function($i) use ($pizzas){
            $p = $pizzas[$i['pizza_id']];
            return [
                'pizza_id' => $p->id,
                'name'     => $p->name,
                'price'    => (float)$p->price,
                'qty'      => (int)$i['qty'],
                'sum'      => (float)$p->price * (int)$i['qty'],
            ];
        })->values();

        $total = round($normalized->sum('sum'), 2);

        $order = \App\Models\Order::create([
            'full_name'  => $request->full_name,
            'address'    => $request->address,
            'phone'      => $request->phone,
            'comment'    => $request->comment,
            'items_json' => $normalized->toJson(JSON_UNESCAPED_UNICODE),
            'total_price'=> $total,
            'status'     => 'new',
        ]);

        return response()->json(['ok'=>true,'order_id'=>$order->id,'total'=>$total], 201);
    }
}
