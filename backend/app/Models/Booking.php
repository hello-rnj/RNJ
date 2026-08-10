<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'company',
        'subject',
        'message',
        'preferred_date',
        'preferred_time',
        'status',
        'payment_status',
        'payment_amount',
        'payment_currency',
        'stripe_checkout_session_id',
        'stripe_payment_intent_id',
        'paid_at',
        'invoice_file_path',
        'invoice_original_name',
        'invoice_mime_type',
        'invoice_uploaded_at',
    ];

    protected function casts(): array
    {
        return [
            'preferred_date' => 'date',
            'paid_at' => 'datetime',
            'invoice_uploaded_at' => 'datetime',
        ];
    }
}
