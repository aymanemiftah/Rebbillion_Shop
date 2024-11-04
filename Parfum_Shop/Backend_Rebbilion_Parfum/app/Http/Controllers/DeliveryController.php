<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    
    public function index()
    {
        return Delivery::select("id",'order_id','user_id','delivery_status','delivery_date')->paginate(10);
    }
    public function DeliveriesAll()
    {
        return Delivery::select("id",'order_id','user_id','delivery_status','delivery_date')->get();
    }

   
    public function store(Request $request)
    {
        $validateData= $request->validate([
            'order_id' => 'required|exists:orders,id',  
            'user_id' => 'required|exists:users,id',    
            'delivery_status' => 'nullable|in:pending,shipped,delivered',  
            'delivery_date' => 'nullable|date',
        ]);

        $delivery= Delivery::create([
            'order_id'=>$validateData["order_id"],
            'user_id'=>$validateData["user_id"],
            'delivery_status'=>$validateData["delivery_status"] ?? 'pending',
            'delivery_date'=>$validateData["delivery_date"]??now(),
        ]);
        return response()->json([
            'message'=>'Delivery Created successfully',
            'delivery'=> $delivery
        ],201);
    }

    
    public function show(Delivery $delivery)
    {
        return response()->json([
            'delivery'=> $delivery
        ]);
    }

    
    
    public function update(Request $request, Delivery $delivery)
    {
        $validateData= $request->validate([
            'delivery_status' => 'required|in:pending,shipped,delivered',
        ]);
        $delivery->update($validateData);
        return response()->json([
            'message'=>'Delivery Updated successfully',
            'delivery'=> $delivery
        ],200);
    }

    
    public function destroy(Delivery $delivery)
    {
        $delivery->delete();
        return response()->json([
            'message'=>'Delivery Deleted successfully',
        ],204);
    }
}
