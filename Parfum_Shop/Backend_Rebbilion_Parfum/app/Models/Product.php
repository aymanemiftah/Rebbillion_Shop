<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class Product extends Model
{
    use HasFactory;
    protected $fillable=[
        "name","description","price","stock","category","sexe","image",'last_price','brands','solde'
    ];

    public function orders()
    {
    return $this->belongsToMany(Order::class)->withPivot('stock', 'price')->withTimestamps();
    }
}
