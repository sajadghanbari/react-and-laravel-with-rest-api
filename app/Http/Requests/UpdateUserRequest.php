<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
    $userId = $this->user->id;

    return [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,'.$userId,
        'password' => 'sometimes|nullable|min:8|confirmed',
    ];
    }
}
