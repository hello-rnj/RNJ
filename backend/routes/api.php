<?php

use App\Http\Controllers\Api\BookingSubmissionController;
use App\Http\Controllers\Api\BookingInvoiceController;
use App\Http\Controllers\Api\ContactSubmissionController;
use App\Http\Controllers\Api\InternalBookingPaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/contacts', [ContactSubmissionController::class, 'store']);
Route::post('/bookings', [BookingSubmissionController::class, 'store']);
Route::get('/bookings/payment-status', [BookingInvoiceController::class, 'paymentStatus']);
Route::post('/bookings/invoice', [BookingInvoiceController::class, 'upload']);
Route::post('/internal/bookings/payment-status', [InternalBookingPaymentController::class, 'update']);
