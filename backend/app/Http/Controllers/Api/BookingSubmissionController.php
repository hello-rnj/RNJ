<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;

class BookingSubmissionController extends Controller
{
    public function store(StoreBookingRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $usesStripeCheckout = filled($validated['stripe_checkout_session_id'] ?? null);
        $defaultFeeCents = (int) config('booking.fee_cents', 0);
        $defaultCurrency = (string) config('booking.currency', 'eur');

        Booking::query()->create([
            ...$validated,
            'status' => 'pending',
            'payment_status' => $usesStripeCheckout ? 'awaiting_payment' : 'unpaid',
            'payment_amount' => $usesStripeCheckout ? $defaultFeeCents : null,
            'payment_currency' => $usesStripeCheckout ? $defaultCurrency : null,
        ]);

        return response()->json([
            'message' => $usesStripeCheckout
                ? 'Votre demande de rendez-vous a ete enregistree. Finalisez maintenant le paiement Stripe.'
                : 'Votre demande de rendez-vous a bien ete enregistree.',
        ], 201);
    }
}
