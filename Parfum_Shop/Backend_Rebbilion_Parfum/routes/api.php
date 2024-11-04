<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\ForgetpasswordController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RefundsController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::resource('products', ProductController::class)->except('index');
    Route::resource('orders', OrdersController::class)->except(['index','store']);
    Route::resource('payments', PaymentController::class)->except('store')->except('store');
    Route::get('/payments-all', [PaymentController::class,'PaymentsAll']);
    
    Route::resource('reports', ReportController::class)->except('store');

    Route::get('/reports-all', [ReportController::class,'ReportsAll']);

    Route::resource('deliveries', DeliveryController::class);

    Route::get('/deliveries-all', [DeliveryController::class,'DeliveriesAll']);

    Route::resource('users', UserController::class)->except(['show','store','update']);
    Route::get('/users-all', [UserController::class,'UsersAll']);
});
Route::middleware(['auth:sanctum','user'])->group(function () {
    
    Route::post('/orders', [OrdersController::class,'store']);

    Route::post('/payments', [PaymentController::class,'store']);

    Route::post('/reports',[ ReportController::class,'store']);


    Route::get('/users/{user}',[ UserController::class,'show']);
    Route::patch('/users/{user}',[ UserController::class,'update']);
    Route::patch('/profil-account/{selfuser}',[ UserController::class,'updateSelfUser']);

    
});



Route::post('/users',[ UserController::class,'store']);

Route::get('/orders',[ OrdersController::class,'index']);

Route::get('/orders-all',[ OrdersController::class,'OrdersAll']);

Route::get('/products',[ ProductController::class,'index']);

Route::get('/products-all',[ ProductController::class,'ProductsAll']);

Route::middleware(['auth:sanctum'])->get('/user',[AuthController::class,'getUser']);

Route::post('/login',[AuthController::class,'login']);

Route::post('/logout',[AuthController::class,'logout']);

Route::post('forget-password', [ForgetpasswordController::class, 'sendResetLinkEmail'])->name('password.email');


Route::post('reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');



