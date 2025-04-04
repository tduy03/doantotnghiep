<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $categories = [];
        for ($i = 1; $i <= 10; $i++) {
            do {
                $slug = $faker->slug();
                $exists = Category::query()->where('slug', $slug)->exists();
            } while ($exists);

            $categories[] = [
                'name' => $faker->word(),
                'slug' => $slug,
            ];
        }
        Category::query()->insert( $categories);
    }
}
