<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'list_hinh_anh.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'products' => 'required|array',
            'products.*.size_id' => 'required|exists:product_sizes,id',
            'products.*.color_id' => 'required|exists:product_colors,id',
            'products.*.quantity' => 'required|integer|min:1',
            'is_sale' => 'nullable|boolean',
            'is_hot' => 'nullable|boolean',
            'is_show_home' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ];
    }

    public function messages()
    {
        return [
            'image.required' => 'Hình ảnh chính là bắt buộc.',
            'products.required' => 'Danh sách sản phẩm là bắt buộc.',
            'products.*.size_id.required' => 'Kích thước là bắt buộc.',
            'products.*.color_id.required' => 'Màu sắc là bắt buộc.',
            'products.*.quantity.required' => 'Số lượng là bắt buộc.',
            'products.*.size_id.exists' => 'Kích thước không tồn tại.',
            'products.*.color_id.exists' => 'Màu sắc không tồn tại.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $products = $this->input('products');
            $existingVariants = [];
            $duplicateVariants = [];

            // Lặp qua tất cả các sản phẩm và kiểm tra sự trùng lặp về kích thước và màu sắc
            foreach ($products as $productVariant) {
                $variantKey = $productVariant['size_id'] . '-' . $productVariant['color_id'];

                // Kiểm tra xem có trùng lặp không
                if (in_array($variantKey, $existingVariants)) {
                    // Nếu trùng lặp, thêm vào danh sách các sản phẩm trùng lặp
                    $duplicateVariants[] = $variantKey;
                } else {
                    // Nếu không trùng lặp, thêm vào danh sách các variants đã xuất hiện
                    $existingVariants[] = $variantKey;
                }
            }

            // Nếu có sản phẩm trùng lặp, thêm lỗi vào validator
            if (!empty($duplicateVariants)) {
                $validator->errors()->add('products', 'Có các sản phẩm trùng kích thước và màu sắc.');
            }
        });
    }
}
