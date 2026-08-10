<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class ContactSubmissionController extends Controller
{
    public function index(): View
    {
        return view('admin.contacts.index', [
            'contacts' => ContactSubmission::query()->latest()->paginate(15)->withQueryString(),
            'statusOptions' => ['new', 'reviewed', 'responded', 'archived'],
        ]);
    }

    public function update(Request $request, ContactSubmission $contactSubmission): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,reviewed,responded,archived'],
        ]);

        $contactSubmission->update($validated);

        return back()->with('status', 'Le statut du contact a ete mis a jour.');
    }
}
