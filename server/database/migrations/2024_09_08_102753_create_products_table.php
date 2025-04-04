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
            $table->id();
            $table->string('name', 255); 
            $table->double('price', 8, 2); 
            $table->unsignedBigInteger('discount_id')->nullable(); 
            $table->string('image', 255)->nullable(); 
            $table->string('description', 255)->nullable(); 
            $table->text('content')->nullable(); 
            $table->integer('view')->nullable(); 
            $table->boolean('is_sale')->default(true); 
            $table->boolean('is_hot')->default(true); 
            $table->boolean('is_show_home')->default(true); 
            $table->boolean('is_active')->default(true); 
            $table->string('product_code', 255)->unique(); 
            $table->unsignedBigInteger('sub_category_id')->nullable(); 
            $table->foreign('discount_id')->references('id')->on('discounts')->onDelete('set null');
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
