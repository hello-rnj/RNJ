<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->string('invoice_file_path')->nullable()->after('paid_at');
            $table->string('invoice_original_name')->nullable()->after('invoice_file_path');
            $table->string('invoice_mime_type', 100)->nullable()->after('invoice_original_name');
            $table->timestamp('invoice_uploaded_at')->nullable()->after('invoice_mime_type');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropColumn([
                'invoice_file_path',
                'invoice_original_name',
                'invoice_mime_type',
                'invoice_uploaded_at',
            ]);
        });
    }
};
