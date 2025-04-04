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
        Schema::create('momos', function (Blueprint $table) {
            $table->id();
            $table->string('partnerCode'); //ma doi tac
            $table->string('orderId'); //ma don hang
            $table->string('requestId'); //ma yeu cau
            $table->decimal('amount',15,2); // so tien giao dich
            $table->string('orderInfo'); //thong tin don hang
            $table->string('orderType'); //loai don hang 
            $table->string('transId')->nullable(); //ma giao dich tu momo 
            $table->integer('resultCode'); // ma ket qua giao dich 
            $table->string('massage')->nullable(); //tin nhanw keet qua 
            $table->string('payType'); //Loai thanh toan 
            $table->timestamp('responseTime')->nullable(); // thoi gian phan hoi 
            $table->text('extraData')->nullable(); //du lieu bo sung 
            $table->string('signature'); // chu ki sac thuc 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('momos');
    }
};
