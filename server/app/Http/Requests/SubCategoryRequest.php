<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
                'name' => ['required', 'string', 'min:5', 'max:255'],
                'image' => ['required','image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
                'status' => ['required', 'string'],
                'category_id' => ['required', 'exists:categories,id'],

            
        ];
    }
    public function messages()
    {
        return [
                'name.required' => 'Tên danh mục không được bỏ trống',
                'name.string' => 'Tên danh mục phải là chuỗi',
                'name.min' => 'Tên danh mục phải có ít nhất 5 ký tự',
                'name.max' => 'Tên danh mục không được quá 255 ký tự',
                'status.required' => 'Trạng thái không được bỏ trống',
                'status.string' => 'Trạng thái phải là số',
                'image.required' => 'Tệp không được để trống',
                'image.image' => 'Tệp phải là hình ảnh',
                'image.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif, svg',
                'image.max' => 'Kích thước hình ảnh không được vượt quá 2048KB',
                'category_id.required' => 'Danh mục danh mục không được bỏ trống',
                'category_id.exists' => 'Danh mục danh mục không tồn tại'
            
        ];
    }
    
       
    
}
