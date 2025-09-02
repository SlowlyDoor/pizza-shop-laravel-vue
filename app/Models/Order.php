<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
      'full_name','address','phone','comment','items_json','total_price','status'
    ];
    protected $casts = ['items_json' => 'array'];
}
