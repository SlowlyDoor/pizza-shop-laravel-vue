<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'full_name' => ['required','string','regex:/^[\p{Cyrillic}\- ]+$/u','min:3','max:100'],
            'address'   => ['required','string','regex:/^[\p{Cyrillic}\d\s\.,;:\(\)\-\/]+$/u','min:5','max:200'],
            'phone'     => ['required','string','regex:/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/'],
            'comment'   => ['nullable','string','max:500'],
            'items'     => ['required','array','min:1'],
            'items.*.pizza_id' => ['required','integer','exists:pizzas,id'],
            'items.*.qty'      => ['required','integer','min:1','max:99'],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.regex' => 'ФИО: только кириллица, пробел и дефис.',
            'address.regex'   => 'Адрес: кириллица, числа и знаки препинания.',
            'phone.regex'     => 'Телефон в формате +7 (000) 000-00-00.',
        ];
    }
}
