<?php

namespace Database\Seeders;

use App\Models\Discount;
use App\Models\Image;
use App\Models\Product;
use App\Models\ProductColor;
use App\Models\ProductDetail;
use App\Models\ProductSize;
use App\Models\SubCategory;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        ProductDetail::query()->truncate();
        Product::query()->truncate();
        ProductColor::query()->truncate();
        ProductSize::query()->truncate();

        $discount = Discount::query()->pluck('id')->toArray();
        $sub_category_id = SubCategory::query()->pluck('id')->toArray();
    
        // kích thước
        foreach (['s', 'm', 'l', 'xl', 'xxl'] as $item) {
            ProductSize::query()->create([
                'name' => $item
            ]);
        }
        // màu sắc
        foreach ([['name' => 'black', 'color_code' => '#000000'], ['name' => 'Blue', 'color_code' => '#0000FF'], ['name' => 'White', 'color_code' => '#FFFFFF'], ['name' => 'Red', 'color_code' => '#FF0000'], ['name' => 'Yellow', 'color_code' => '#FFFF00']] as $item) {
            ProductColor::query()->create([
                'name' => $item['name'],
                'color_code' => $item['color_code']
            ]);
        }
        // sản phẩm
        for ($i = 0; $i < 10; $i++) {
            $name = fake()->text(100);
            $code_id = 1;
          $products=  Product::query()->create([
                'name' => $name,
                'price' => fake()->numberBetween(100,10000),
                'discount_id' => fake()->randomElement($discount),
                'image' => fake()->imageUrl(),
                'description' => fake()->name(),
                'content' => fake()->text(2000),
                'view' => fake()->numberBetween(1, 1000),
                'is_sale' => fake()->boolean(),
                'is_hot' => fake()->boolean(),
                'is_show_home' => fake()->boolean(),
                'is_active' => fake()->boolean(),
                'product_code' => \Str::slug($name) . '-' . $code_id++,
                'sub_category_id' => fake()->randomElement($sub_category_id),

            ]);
        }
        $product = Product::query()->pluck('id')->toArray();
        for ($i = 1; $i < 10; $i++) {
            Image::query()->insert([
                'image' => fake()->imageUrl(),
                'product_image_id' => fake()->randomElement($product),

            ]);
        }
        $product_size = ProductSize::query()->pluck('id')->toArray();
        $product_color = ProductColor::query()->pluck('id')->toArray();

        $data = [];
        foreach ($product as $productId) {
            foreach ($product_size as $product_size_id) {
                foreach ($product_color as $product_color_id) {
                    $data[] = [
                        'product_id' => $productId,
                        'size_id' => $product_size_id,
                        'color_id' => $product_color_id,
                        'quantity' => fake()->numberBetween(1, 100),
                    ];
                }
            }
        }
        \DB::table('product_details')->insert($data);
    }
}
