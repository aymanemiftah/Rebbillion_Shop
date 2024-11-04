<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade'); 
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->decimal('amount', 8, 2); 
            $table->string('card_number',19)->nullable(); 
            $table->string('card_expiration')->nullable(); 
            $table->bigInteger('cvv')->nullable(); 
            $table->string('paypal_account')->nullable(); 
            $table->string('paypal_password')->nullable(); 
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending'); 
            $table->enum('payment_method', ['credit_card', 'paypal', 'payments_on_delivery']); 
            $table->timestamp('payment_date')->useCurrent();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
