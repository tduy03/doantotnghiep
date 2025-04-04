<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Schema::create('product_views', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('user_id');
        //     $table->unsignedBigInteger('product_id');
        //     $table->timestamp('viewed_at')->useCurrent();
        //     $table->timestamps(); // Tự động tạo cột 'created_at' và 'updated_at'


        //     // Tạo khóa ngoại liên kết với bảng users và products
        //     $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        //     $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        // });
        Schema::create('product_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');
            // $table->timestamp('viewed_at')->useCurrent();

            // Đảm bảo không có bản ghi trùng lặp giữa user và product
            $table->unique(['user_id', 'product_id']);

            // Khóa ngoại
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('product_views');
    }
};
