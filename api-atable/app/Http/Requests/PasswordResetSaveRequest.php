<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PasswordResetSaveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'token'     => 'required',
            'password'  => 'required|min:8',
            'password_confirmation' => 'required|same:password'
        ];
    }

    public function messages()
    {
        return [
            'token.required'    => 'Le token est obligatoire',
            'password.email'    => 'Le mot de passe est obligatoire',
            'password.exists'   => 'Le mot de passe doit faire minimum 8 caractères de long',
            'password_confirmation.required'    => 'La confirmation du mot de passe est obligatoire',
            'password_confirmation.same'        => 'Les deux mots de passe ne sont pas identiques'

        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
