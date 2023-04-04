<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PasswordResetNotifyRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email' => 'required|email|exists:user',
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'L\'email est obligatoire',
            'email.email'       => 'L\'email n\'est pas au bon format',
            'email.exists'      => 'Adresse email inexistante',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
