<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Booking Fee Defaults
    |--------------------------------------------------------------------------
    |
    | This amount is used as a fallback value for booking records when no
    | explicit payment amount is received from Stripe webhook payloads.
    |
    */
    'fee_cents' => (int) env('BOOKING_FEE_CENTS', 0),
    'currency' => (string) env('BOOKING_FEE_CURRENCY', 'eur'),
];

