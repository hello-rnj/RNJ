<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class BookingController extends Controller
{
    public function index(): View
    {
        return view('admin.bookings.index', [
            'bookings' => Booking::query()->latest()->paginate(15)->withQueryString(),
            'statusOptions' => ['pending', 'confirmed', 'completed', 'cancelled'],
        ]);
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,completed,cancelled'],
        ]);

        $booking->update($validated);

        return back()->with('status', 'Le statut du rendez-vous a ete mis a jour.');
    }

    public function downloadInvoice(Booking $booking): Response|RedirectResponse
    {
        if (! filled($booking->invoice_file_path)) {
            return back()->withErrors('Aucune facture televersee pour ce rendez-vous.');
        }

        if (! Storage::disk('local')->exists($booking->invoice_file_path)) {
            return back()->withErrors('Le fichier facture est introuvable.');
        }

        return Storage::disk('local')->download(
            $booking->invoice_file_path,
            $booking->invoice_original_name ?: basename($booking->invoice_file_path)
        );
    }
}
