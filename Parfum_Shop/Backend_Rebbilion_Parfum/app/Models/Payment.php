<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable=[
        "order_id","user_id","amount","card_number","card_expiration","cvv","paypal_account","paypal_password","status","payment_method","payment_date"
    ];
}
