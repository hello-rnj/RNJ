<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
            'preferred_date' => ['required', 'date'],
            'preferred_time' => ['nullable', 'string', 'max:50'],
            'stripe_checkout_session_id' => ['nullable', 'string', 'max:255', 'unique:bookings,stripe_checkout_session_id'],
        ];
    }
}
