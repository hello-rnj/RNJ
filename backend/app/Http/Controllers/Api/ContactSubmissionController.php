<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactSubmissionRequest;
use App\Models\ContactSubmission;
use App\Services\AdminNotificationEmailService;
use Illuminate\Http\JsonResponse;
use Throwable;

class ContactSubmissionController extends Controller
{
    public function store(
        StoreContactSubmissionRequest $request,
        AdminNotificationEmailService $adminNotificationEmailService
    ): JsonResponse
    {
        $contact = ContactSubmission::query()->create([
            ...$request->validated(),
            'status' => 'new',
        ]);

        try {
            $adminNotificationEmailService->sendNewContact($contact);
        } catch (Throwable $exception) {
            report($exception);
        }

        return response()->json([
            'message' => 'Votre message a bien ete enregistre.',
        ], 201);
    }
}
