<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   

    public function run(): void
    {
      $productDetail =   ProductDetail::query()->pluck('id')->toArray();
      $order=Order::query()->pluck('id')->toArray();
        OrderDetail::create([
            'total' =>1,
            'order_id'=>fake()->randomElement($order),
            'product_detail_id'=>fake()->randomElement($productDetail),
            'price'=>100000,
            'quantity'=>1,
            'total_amount'=>30000
        ]);
    }
}
