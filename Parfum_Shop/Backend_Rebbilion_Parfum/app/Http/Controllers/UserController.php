<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    
    public function index()
    {
        return User::select('id','name','email','password',"address","role","phonenumber")->paginate(10);
    }
    public function UsersAll()
    {
        return User::select('id','name','email','password',"address","role","phonenumber")->get();
    }

   
   

   
    public function store(Request $request)
    {
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'address' => 'required|string|max:255',
            'phonenumber'=>'required|string|regex:/^\+212 \d{3}-\d{6}$/',
            'password' => 'required|string|min:8',
            'confirmation_password'=>'required|same:password|min:8',
            'role' => 'nullable|in:user,admin,manager',
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
            
        ]);
            if($request->hasFile('image')){
                $imagepath=$request->file('image')->store('images','public');
                $validatedData['image']=$imagepath;
            }
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'address' => $validatedData['address'],
            'phonenumber' => $validatedData['phonenumber'],
            'password' => bcrypt($validatedData['password']),
            'confirmation_password' => bcrypt($validatedData['confirmation_password']),
            'role' => $validatedData['role'] ?? 'user',
            'image' => $validatedData['image'] ?? null,
           
        ]);

    
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

   
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json([
            'user'=>$user
        ]);
    }


    
    public function update(Request $request, string $id)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'address' => 'required|string|max:255',
            'phonenumber'=>'required|string|regex:/^\+212 \d{3}-\d{6}$/',
            'role' => 'required|in:user,manager,admin', 
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);
        $user = User::findOrFail($id);

        if($request->hasfile('image')){
            $imagepath=$request->file('image')->store('images','public');
            $validatedData['image']=$imagepath;
        }

        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->address = $validatedData['address'];
        $user->phonenumber = $validatedData['phonenumber'];
        $user->role = $validatedData['role'];
        $user->image = $validatedData['image']??null;

        $user->save(); 
        
        
        return response()->json([
            'message' => 'User Updated successfully',
            'user' => $user
        ], 200);
    }
    public function updateSelfUser(Request $request, string $id)
    {

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'address' => 'required|string|max:255',
            'phonenumber'=>'required|string|regex:/^\+212 \d{3}-\d{6}$/',
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);
        $user = User::findOrFail($id);

        if($request->hasfile('image')){
            $imagepath=$request->file('image')->store('images','public');
            $validatedData['image']=$imagepath;
        }

        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->address = $validatedData['address'];
        $user->phonenumber = $validatedData['phonenumber'];
        $user->image = $validatedData['image']??null;

        $user->save(); 
        
        
        return response()->json([
            'message' => 'User Updated successfully',
            'user' => $user
        ], 200);
    }

    
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json([
            'message'=>'User Deleted successfully'
        ],204);

    }
}
