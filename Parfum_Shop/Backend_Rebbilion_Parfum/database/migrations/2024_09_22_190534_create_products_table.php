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
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id'); 
            $table->string('name'); 
            $table->text('description')->nullable(); 
            $table->decimal('price', 8, 2); 
            $table->bigInteger('last_price')->nullable(); 
            $table->bigInteger('solde')->default(0); 
            $table->bigInteger('stock')->default(0); 
            $table->string('brands'); 
            $table->enum('category', ['Parfum', 'Make_up', 'Facial_treatment', 'Hors_Body']); 
            $table->enum('sexe', ['Men', 'Women']); 
            $table->string('image')->nullable(); 
            $table->timestamps(); 
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
