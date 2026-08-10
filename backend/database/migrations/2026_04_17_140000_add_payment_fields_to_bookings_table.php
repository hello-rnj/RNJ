<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->string('payment_status', 30)->default('unpaid')->after('status');
            $table->unsignedInteger('payment_amount')->nullable()->after('payment_status');
            $table->string('payment_currency', 10)->nullable()->after('payment_amount');
            $table->string('stripe_checkout_session_id')->nullable()->unique()->after('payment_currency');
            $table->string('stripe_payment_intent_id')->nullable()->after('stripe_checkout_session_id');
            $table->timestamp('paid_at')->nullable()->after('stripe_payment_intent_id');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropUnique(['stripe_checkout_session_id']);
            $table->dropColumn([
                'payment_status',
                'payment_amount',
                'payment_currency',
                'stripe_checkout_session_id',
                'stripe_payment_intent_id',
                'paid_at',
            ]);
        });
    }
};
