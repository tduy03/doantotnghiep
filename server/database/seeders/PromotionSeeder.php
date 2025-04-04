<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Promotion::create([
            Promotion::create([
                'code' =>'SUM_2024',
                'discount' => fake()->randomFloat(2, 0, 100), 
                'discount_type' => 'percentage', 
                'minimum_spend' => fake()->randomFloat(2, 0, 1000), 
                'start_date' => now(),
                'end_date' => now()->addDays(30),
                'usage_limit' => fake()->randomDigitNotNull(),
                'status' => 'active' ,
            ])
        ]);
    }
}
