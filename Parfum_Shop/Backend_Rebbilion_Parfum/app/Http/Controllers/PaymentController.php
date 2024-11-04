<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return  Payment::select("id","order_id","user_id","amount","card_number","card_expiration","cvv","paypal_account","paypal_password","status","payment_method","payment_date")->paginate(10);
    }
    public function PaymentsAll()
    {
        return  Payment::select("id","order_id","user_id","amount","card_number","card_expiration","cvv","paypal_account","paypal_password","status","payment_method","payment_date")->get();
    }

   
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'order_id' => 'required|exists:orders,id',  
            'user_id' => 'required|exists:users,id',    
            'amount' => 'required|numeric|min:0',        
            'card_number' => 'nullable|string|regex:/^\d{4}-\d{4}-\d{4}-\d{4}$/', 
            'card_expiration' => 'nullable|string|max:7', 
            'cvv' => 'nullable|digits:3',                
            'paypal_account' => 'nullable|email',        
            'paypal_password' => 'nullable|string|max:255',
            'payment_method' => 'required|in:credit_card,paypal,payments_on_delivery', // Must be one of the methods
            'payment_date' => 'nullable|date',    
        ]);
        $payment=Payment::create([
           'order_id' =>$validateData['order_id'],
           'user_id' =>$validateData['user_id'],
           'amount' =>$validateData['amount'],
           'card_number' => str_replace(' ', '-', $validateData['card_number']),
           'card_expiration' =>$validateData['card_expiration'],
           'cvv' =>$validateData['cvv'],
           'paypal_account' =>$validateData['paypal_account'],
           'paypal_password' =>$validateData['paypal_password'],
           'payment_method' =>$validateData['payment_method'],
           'payment_date' =>$validateData['payment_date']?? now(),
        ]);
        return response()->json([
            'message'=>'Payment Deleted successfully',
            'payment'=>$payment
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        return response()->json([
            'payment'=>$payment
        ]);
    }

   
    public function update(Request $request, Payment $payment)
    {
        $validateData = $request->validate([
            'status' => 'required|in:pending,completed,failed',    
        ]);

        $payment->update($validateData);

        return response()->json([
            'message'=>'Payment Updated successfully',
            'payment'=>$payment
        ],200);
    }

   
    public function destroy(Payment $payment)
    {
        $payment->delete();
        return response()->json([
            'message'=>'Payment Deleted successfully',
        ],204);
    }
}
