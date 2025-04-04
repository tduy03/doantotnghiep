<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Shipping;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shipping = Shipping::query()->pluck('id')->toArray();
        $promotion = Shipping::query()->pluck('id')->toArray();
        $user = User::query()->pluck('id')->toArray();
        $Order = Order::create([
            'code_order' => fake()->unique()->randomNumber(6),
            'user_id' => fake()->randomElement($user),
            'username' => fake()->name(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'email' => fake()->safeEmail(),
            'note' => fake()->sentence(6),
            'order_status' => 'pending',
            'order_payment' => 'credit_card',
            'commodity_money' => fake()->randomFloat(2, 10, 1000),
            'total_amount' => fake()->randomFloat(2, 10, 1000),
            'shipping_id' => fake()->randomElement($shipping),
            'promotion_id' => fake()->randomElement($promotion)
        ]);
    }
}
