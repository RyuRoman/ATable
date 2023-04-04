<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'email' => ['required', 'email', 'max:190'],
            'password' => ['required', 'min:8']
        ];

        if (request()->path() === "api/register") {
            array_push($rules['email'], 'unique:user');
            $rules['first_name'] = ['required', 'string'];
            $rules['last_name'] = ['required', 'string'];
            $rules['password_confirmation'] = ['required', 'same:password'];
            $rules['description'] = ['required', 'string'];
            $rules['phone'] = ['required', 'string'];
            $rules['date_of_birth'] = ['required', 'string'];
            $rules['gender'] = ['required', 'string'];
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'email.required'        => 'L\'email est obligatoire',
            'email.email'           => 'L\'email n\'est pas au bon format',
            'email.max'             => 'L\'email ne doit pas dépasser 190 caractères de long',
            'email.unique'          => 'Cet email est déjà utilisé',
            'password.required'     => 'Le mot de passe est obligatoire',
            'password.min'          => 'Le mot de passe doit faire minimum 8 caractères de long',
            'first_name.required'   => 'Le prénom est obligatoire',
            'first_name.string'     => 'Le prénom est invalide',
            'last_name.required'    => 'Le nom est obligatoire',
            'last_name.string'      => 'Le nom est invalide',
            'password_confirmation.required'    => 'La confirmation du mot de passe est obligatoire',
            'password_confirmation.same'        => 'Les deux mots de passe ne sont pas identiques'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 422));
    }
}
