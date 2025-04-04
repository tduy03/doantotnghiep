<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sub_categories = [];
        $categories = Category::query()->pluck('id')->toArray(); // Get all category IDs

        for ($i = 0; $i < 10; $i++) {
            $sub_categories[] = [
                'name' => fake()->word(),
                'image' => fake()->imageUrl(), // Generates a placeholder image URL
                'category_id' => fake()->randomElement($categories), // Assign a random category ID
            ];
        }

        SubCategory::query()->insert($sub_categories); // Bulk insert into the sub_categories table
    }
}
