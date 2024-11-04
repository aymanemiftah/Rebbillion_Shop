<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "email"=>'required|email',
            "password"=>'required|min:5'
        ]);
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(Auth::user());
        }

        return response()->json(['errors' => ['email' => ['The email or password is incorrect.']]], 401);
    }

    public function Logout(Request $request){

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message'=>'Logged out'
        ]);
    }

    public function getUser(){
        if(Auth::user()){
            return response()->json(Auth::user());
        }
        else{
            return response()->json(['message'=>"non login rith now"]);
        }
        
    }
}
