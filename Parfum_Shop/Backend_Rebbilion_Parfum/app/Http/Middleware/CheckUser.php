<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        

        if (!auth()->check() || 
        (auth()->user()->role !== 'user' && 
         auth()->user()->role !== 'admin' && 
         auth()->user()->role !== 'manager')) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
        return $next($request);
    }
}