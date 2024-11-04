<?php

namespace App\Http\Controllers;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;

class ForgetpasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }

        
        $token = Password::getRepository()->create($user);

        
        $user->notify(new ResetPasswordNotification($token));

        return response()->json(['message' => 'Password reset link sent.'], 200);
    }

    
    

}
