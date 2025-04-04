<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:2', 'max:255'],
        ];
    }
    public function messages()
    {
        return [
                'name.required' => 'Tên danh mục không được bỏ trống',
                'name.string' => 'Tên danh mục phải là chuỗi',
                'name.min' => 'Tên danh mục phải có ít nhất 2 ký tự',
                'name.max' => 'Tên danh mục không được quá 255 ký tự',
        ];
    }
}
