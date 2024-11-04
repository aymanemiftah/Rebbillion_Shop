<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    
    public function index()
    {
        return Order::with('products')->paginate(10);
    }
    public function OrdersAll()
    {
        return Order::with('products')->get();
    }

  
    public function store(Request $request)
    {
            $validatedata=$request->validate([
                "user_id"=>"required|exists:users,id",
                "products"=>"required|array",
                "products.*.id"=>"required|exists:products,id",
                "products.*.stock"=>"required|integer|min:1",
                "products.*.price" => "required|numeric|min:0",
                "total_price"=>"required|numeric|min:0",
                "status"=>"nullable|in:pending,compelted,canceled",
                "order_date"=>"nullable|date",
            ]);
            $order= Order::create([
                'user_id'=>$validatedata['user_id'],
                'total_price'=>$validatedata['total_price'],
                'status'=>$validatedata['status'] ?? 'pending' ,
                'order_date'=>$validatedata['order_date']?? now(),
            ]);
            foreach($validatedata['products'] as $product){
                $order->products()->attach($product["id"],[
                    'stock'=>$product["stock"],
                    "price"=>$product['price']
                ]);
            }

            return response()->json([
                'message' => 'Order Created successfully',
                 'order' => $order
                ], 201);
        }
    
    

    
    public function show(Order $order)
    {
        return response()->json([
            "orders"=>$order
        ]);
    }

    

   
    public function update(Request $request, Order $order)
    {
        $validateData=$request->validate([
            'status'=>'sometimes|required|in:pending,completed,canceled',
        ]);
        $order->update($validateData);

        return response()->json([
            'message'=>'Order Updated successfully',
            'order'=>$order,
        ],200);
        
    }

   
    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json([
            'message'=>'Order Deleted successfully',
        ],204);
    }
}
