<?php

use App\Models\Order;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code_order'); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            $table->string('username'); 
            $table->string('phone'); 
            $table->string('address'); 
            $table->string('email'); 
            $table->text('note')->nullable(); 
            $table->string('order_status')->default(Order::CHO_XAC_NHA)->change();
            $table->string('order_payment')->default(Order::CHUA_THANH_TOAN)->change();
            $table->double('commodity_money', 8, 2)->nullable(); 
            $table->double('total_amount', 8, 2); 
            $table->foreignId('shipping_id')->nullable()->constrained()->onDelete('set null'); 
            $table->foreignId('promotion_id')->nullable()->constrained()->onDelete('set null'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
