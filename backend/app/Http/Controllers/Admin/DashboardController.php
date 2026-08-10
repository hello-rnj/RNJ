<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ContactSubmission;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $dashboardBookingStatuses = ['paid', 'unpaid'];

        $stats = [
            'new_contacts' => ContactSubmission::query()->where('status', 'new')->count(),
            'pending_bookings' => Booking::query()
                ->where('status', 'pending')
                ->whereIn('payment_status', $dashboardBookingStatuses)
                ->count(),
            'total_contacts' => ContactSubmission::query()->count(),
            'total_bookings' => Booking::query()
                ->whereIn('payment_status', $dashboardBookingStatuses)
                ->count(),
        ];

        return view('admin.dashboard', [
            'stats' => $stats,
            'latestContacts' => ContactSubmission::query()->latest()->limit(5)->get(),
            'latestBookings' => Booking::query()
                ->whereIn('payment_status', $dashboardBookingStatuses)
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
