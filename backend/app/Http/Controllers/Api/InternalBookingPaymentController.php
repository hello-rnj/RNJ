<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\AdminNotificationEmailService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class InternalBookingPaymentController extends Controller
{
    public function update(
        Request $request,
        AdminNotificationEmailService $adminNotificationEmailService
    ): JsonResponse
    {
        $configuredToken = (string) config('services.internal_api.token');
        $providedToken = (string) $request->header('X-Internal-Token');

        if ($configuredToken === '' || ! hash_equals($configuredToken, $providedToken)) {
            return response()->json([
                'message' => "Acces interne refuse pour la synchronisation Stripe.",
            ], 403);
        }

        $validated = $request->validate([
            'stripe_checkout_session_id' => ['required', 'string', 'max:255'],
            'payment_status' => ['required', 'in:paid,failed'],
            'stripe_payment_intent_id' => ['nullable', 'string', 'max:255'],
            'payment_amount' => ['nullable', 'integer', 'min:0'],
            'payment_currency' => ['nullable', 'string', 'max:10'],
            'paid_at' => ['nullable', 'date'],
        ]);

        $booking = Booking::query()
            ->where('stripe_checkout_session_id', $validated['stripe_checkout_session_id'])
            ->first();

        if (! $booking) {
            return response()->json([
                'message' => 'Aucun rendez-vous ne correspond a cette session Stripe.',
            ], 404);
        }

        if ($validated['payment_status'] === 'paid') {
            $wasAlreadyPaid = $booking->payment_status === 'paid';
            $defaultFeeCents = (int) config('booking.fee_cents', 0);
            $defaultCurrency = (string) config('booking.currency', 'eur');

            $booking->update([
                'payment_status' => 'paid',
                'stripe_payment_intent_id' => $validated['stripe_payment_intent_id'] ?? $booking->stripe_payment_intent_id,
                'payment_amount' => $validated['payment_amount'] ?? $booking->payment_amount ?? $defaultFeeCents,
                'payment_currency' => $validated['payment_currency'] ?? $booking->payment_currency ?? $defaultCurrency,
                'paid_at' => $validated['paid_at'] ?? $booking->paid_at ?? now(),
            ]);

            if (! $wasAlreadyPaid) {
                try {
                    $adminNotificationEmailService->sendNewBooking($booking->fresh());
                } catch (Throwable $exception) {
                    report($exception);
                }
            }

            return response()->json([
                'message' => 'Le rendez-vous a ete marque comme paye.',
            ]);
        }

        if ($booking->payment_status !== 'paid') {
            $booking->update([
                'payment_status' => 'failed',
            ]);
        }

        return response()->json([
            'message' => 'Le paiement du rendez-vous a ete marque comme echoue.',
        ]);
    }
}
