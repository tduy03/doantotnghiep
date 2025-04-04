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
        Schema::create('vnpayys', function (Blueprint $table) {
            $table->id();
            $table->string('vnp_Amount')->nullable(); // giá tiền
            $table->string('vnp_BankCode')->nullable(); // Ngân hàng
            $table->string('vnp_BankTranNo')->nullable(); //mã giao dịch ngân hàng
            $table->string('vnp_CardType')->nullable(); // atm hoặc qr
            $table->string('vnp_OrderInfo')->nullable(); // thông tin
            $table->string('vnp_PayDate')->nullable(); // ngày giờ thanh toán
            $table->string('vnp_ResponseCode')->nullable(); // trạng thái thanh toán
            $table->string('vnp_TmnCode')->nullable(); 
            $table->string('vnp_TransactionStatus')->nullable(); 
            $table->string('vnp_TxnRef')->nullable();
            $table->string('vnp_SecureHash')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vnpayys');
    }
};

