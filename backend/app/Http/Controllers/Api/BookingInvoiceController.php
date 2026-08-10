<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BookingInvoiceController extends Controller
{
    public function paymentStatus(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'stripe_checkout_session_id' => ['required', 'string', 'max:255'],
        ]);

        $booking = Booking::query()
            ->where('stripe_checkout_session_id', $validated['stripe_checkout_session_id'])
            ->first();

        if (! $booking) {
            return response()->json([
                'message' => 'Aucun rendez-vous ne correspond a cette session Stripe.',
            ], 404);
        }

        return response()->json([
            'is_paid' => $booking->payment_status === 'paid',
            'payment_status' => $booking->payment_status,
            'paid_at' => $booking->paid_at?->toIso8601String(),
            'booking' => [
                'subject' => $booking->subject,
                'preferred_date' => $booking->preferred_date?->format('Y-m-d'),
                'preferred_time' => $booking->preferred_time,
                'payment_amount' => $booking->payment_amount,
                'payment_currency' => $booking->payment_currency,
                'name' => $booking->name,
                'email' => $booking->email,
                'phone' => $booking->phone,
                'reference' => sprintf(
                    'RNJ-%s-%s',
                    $booking->preferred_date?->format('Ymd') ?? now()->format('Ymd'),
                    str_replace(':', '', $booking->preferred_time ?: '1500')
                ),
            ],
            'invoice_upload' => [
                'uploaded' => filled($booking->invoice_file_path),
                'filename' => $booking->invoice_original_name,
                'uploaded_at' => $booking->invoice_uploaded_at?->toIso8601String(),
            ],
        ]);
    }

    public function upload(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'stripe_checkout_session_id' => ['required', 'string', 'max:255'],
            'invoice_file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png,webp', 'max:10240'],
        ]);

        $booking = Booking::query()
            ->where('stripe_checkout_session_id', $validated['stripe_checkout_session_id'])
            ->first();

        if (! $booking) {
            return response()->json([
                'message' => 'Aucun rendez-vous ne correspond a cette session Stripe.',
            ], 404);
        }

        if ($booking->payment_status !== 'paid') {
            return response()->json([
                'message' => 'Le paiement doit etre confirme avant de televerser une facture.',
            ], 403);
        }

        $invoiceFile = $validated['invoice_file'];

        if (! $invoiceFile instanceof UploadedFile) {
            return response()->json([
                'message' => 'Le fichier facture est invalide.',
            ], 422);
        }

        $extension = strtolower($invoiceFile->getClientOriginalExtension() ?: $invoiceFile->extension() ?: 'bin');
        $filename = sprintf(
            'invoice-%s-%s.%s',
            now()->format('YmdHis'),
            Str::lower(Str::random(8)),
            $extension
        );
        $directory = sprintf('booking-invoices/%d', $booking->id);
        $path = $invoiceFile->storeAs($directory, $filename, 'local');

        if (! $path) {
            return response()->json([
                'message' => 'Impossible de sauvegarder la facture envoyee.',
            ], 500);
        }

        if (filled($booking->invoice_file_path) && $booking->invoice_file_path !== $path) {
            Storage::disk('local')->delete((string) $booking->invoice_file_path);
        }

        $booking->update([
            'invoice_file_path' => $path,
            'invoice_original_name' => $invoiceFile->getClientOriginalName(),
            'invoice_mime_type' => $invoiceFile->getClientMimeType(),
            'invoice_uploaded_at' => now(),
        ]);

        return response()->json([
            'message' => 'Facture televersee avec succes.',
            'invoice_upload' => [
                'uploaded' => true,
                'filename' => $booking->invoice_original_name,
                'uploaded_at' => $booking->invoice_uploaded_at?->toIso8601String(),
            ],
        ]);
    }
}
