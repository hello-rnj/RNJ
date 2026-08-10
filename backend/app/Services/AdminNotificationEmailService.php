<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\ContactSubmission;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AdminNotificationEmailService
{
    public function sendNewContact(ContactSubmission $contact): void
    {
        $this->sendEmail(
            subject: sprintf('[RNJ Advisory] Nouveau contact: %s', $contact->subject),
            view: 'emails.contact-notification',
            data: [
                'contact' => $contact,
            ]
        );
    }

    public function sendNewBooking(Booking $booking): void
    {
        $this->sendEmail(
            subject: sprintf('[RNJ Advisory] Nouveau rendez-vous paye: %s', $booking->subject),
            view: 'emails.booking-notification',
            data: [
                'booking' => $booking,
            ]
        );
    }

    private function sendEmail(string $subject, string $view, array $data): void
    {
        $to = (string) config('services.admin_notifications.to');

        if ($to === '') {
            Log::warning('RNJ admin notification email skipped because CONTACT_TO_EMAIL is missing.');

            return;
        }

        try {
            Mail::send($view, $data, function ($message) use ($subject, $to): void {
                $message->to($to)->subject($subject);
            });
        } catch (\Throwable $exception) {
            Log::error('RNJ admin notification email failed.', [
                'error' => $exception->getMessage(),
                'subject' => $subject,
            ]);

            throw $exception;
        }
    }
}
