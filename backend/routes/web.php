<?php

use App\Http\Controllers\Admin\AuthenticatedSessionController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\ContactSubmissionController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin');

Route::middleware('guest')->group(function (): void {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

Route::middleware('auth')->group(function (): void {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/contacts', [ContactSubmissionController::class, 'index'])->name('admin.contacts.index');
    Route::patch('/admin/contacts/{contactSubmission}', [ContactSubmissionController::class, 'update'])
        ->name('admin.contacts.update');

    Route::get('/admin/bookings', [BookingController::class, 'index'])->name('admin.bookings.index');
    Route::patch('/admin/bookings/{booking}', [BookingController::class, 'update'])
        ->name('admin.bookings.update');
    Route::get('/admin/bookings/{booking}/invoice', [BookingController::class, 'downloadInvoice'])
        ->name('admin.bookings.invoice.download');
});
