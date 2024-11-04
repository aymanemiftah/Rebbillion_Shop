<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
   
    public function index()
    {
        return Product::select('id','name','description','price','last_price','brands','stock','category','sexe','image','solde')->paginate(10);
    }
    public function ProductsAll()
    {
        return Product::select('id','name','description','price','last_price','brands','stock','category','sexe','image','solde')->get();
    }


    public function store(Request $request)
    {
        $validateData=$request->validate([
            "name" => "required|string|max:255",  
            "description" => "required|string|max:1000",  
            "price" => "required|numeric|min:0", 
            "last_price" => "nullable|min:0", 
            "solde" => "nullable|min:0", 
            "stock" => "required|integer|min:0", 
            "brands" => "required|string|max:255",  
            "category" => "required|in:Parfum,Make_up,Facial_treatment,Refreshment", 
            "sexe" => "required|in:Men,Women",  
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);
        if($request->hasFile('image')){
            $imagePath = $request->file("image")->store("images","public");
            $validateData['image']= $imagePath;
        }
        $product = Product::create([
            "name"=>$validateData["name"],
            "description"=>$validateData["description"],
            "price"=>$validateData["price"],
            "last_price"=>$validateData["last_price"] ?? 0,
            "solde"=>$validateData["solde"] ?? 0,
            "stock"=>$validateData["stock"],
            "brands"=>$validateData["brands"],
            "category"=>$validateData["category"],
            "sexe"=>$validateData["sexe"],
            "image"=>$validateData["image"] ?? null,
        ]);
        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json([
            'product'=>$product
        ]);
    }

    

    
    public function update(Request $request, Product $product)
    {
        $validateData=$request->validate([
            "name" => "required|string|max:255",  
            "description" => "required|string|max:1000",  
            "price" => "required|numeric|min:0", 
            "stock" => "required|integer|min:0", 
            "last_price" => "nullable", 
            "solde" => "nullable|min:0",
            "brands" => "required|string|max:255",  
            "category" => "required|in:Parfum,Make_up,Facial_treatment,Refreshment", 
            "sexe" => "required|in:Men,Women",  
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);

        if($request->hasFile('image')){
            $imagePath=$request->file('image')->store('images',"public");
            $validateData['image']= $imagePath;
        }

        $product->update([
            "name"=>$validateData["name"],
            "description"=>$validateData["description"],
            "price"=>$validateData["price"],
            "last_price"=>$validateData["last_price"] ?? null,
            "solde"=>$validateData["solde"] ?? 0,
            "stock"=>$validateData["stock"],
            "brands"=>$validateData["brands"],
            "category"=>$validateData["category"],
            "sexe"=>$validateData["sexe"],
            "image"=>$validateData["image"] ?? null,
        ]);
        return response()->json([
            'message'=>'Product Updated successfully',
            'product' => $product
        ],200);
    }

    
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json([
            'message'=>'Product Deleted successfully'
        ],204);
    }
}
