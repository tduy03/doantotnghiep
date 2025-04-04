<?php

namespace Database\Seeders;

use App\Models\Discount;
use App\Models\SubCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subcategory = SubCategory::query()->pluck('id')->toArray();
        $discount = [];
        for ($i = 0; $i < 10; $i++) {
            $discount[] = [
                'sub_category_id' => fake()->randomElement($subcategory),
                'discount_percent' => fake()->numberBetween(1, 100),
            ];
        }
        Discount::query()->insert($discount);
    }
}
