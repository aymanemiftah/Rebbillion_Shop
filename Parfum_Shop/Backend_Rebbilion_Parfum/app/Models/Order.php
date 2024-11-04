<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable=[
        "user_id","id_product","total_price","status","order_date"
    ];

    public function products()
{
    return $this->belongsToMany(Product::class)->withPivot('stock', 'price')->withTimestamps();
}
}
