@extends('layouts.admin')

@section('title', 'Rendez-vous admin')

@section('body')
    <div class="shell">
        @include('admin.partials.sidebar')

        <main class="content">
            <div class="topbar">
                <div>
                    <h1 class="page-title">Demandes de rendez-vous</h1>
                    <p class="page-copy">Suivez les demandes de prise de rendez-vous envoyees depuis le site.</p>
                </div>
                <span class="badge">{{ $bookings->total() }} rendez-vous</span>
            </div>

            @if (session('status'))
                <div class="flash">{{ session('status') }}</div>
            @endif

            @if ($errors->any())
                <div class="errors">{{ $errors->first() }}</div>
            @endif

            <section class="table-stack">
                @forelse ($bookings as $booking)
                    <article class="entry">
                        <div class="entry-head">
                            <div>
                                <h2 class="entry-title">{{ $booking->name }}</h2>
                                <p class="meta">{{ $booking->subject }} · Recu le {{ $booking->created_at?->format('d/m/Y H:i') }}</p>
                            </div>
                            <div style="display:flex; gap:8px; flex-wrap:wrap;">
                                <span class="badge">{{ $booking->status }}</span>
                                <span class="badge">{{ $booking->payment_status }}</span>
                            </div>
                        </div>

                        <div class="entry-grid">
                            <div><strong>Email:</strong> {{ $booking->email }}</div>
                            <div><strong>Telephone:</strong> {{ $booking->phone }}</div>
                            <div><strong>Societe:</strong> {{ $booking->company ?: 'Non renseignee' }}</div>
                            <div><strong>Date souhaitee:</strong> {{ $booking->preferred_date?->format('d/m/Y') }}</div>
                            <div><strong>Heure souhaitee:</strong> {{ $booking->preferred_time ?: 'A confirmer' }}</div>
                            <div><strong>Montant:</strong> {{ $booking->payment_amount ? number_format($booking->payment_amount / 100, 2, ',', ' ') . ' ' . strtoupper((string) $booking->payment_currency) : 'En attente' }}</div>
                            <div><strong>Paiement confirme le:</strong> {{ $booking->paid_at?->format('d/m/Y H:i') ?: 'Non confirme' }}</div>
                            <div><strong>Session Stripe:</strong> {{ $booking->stripe_checkout_session_id ?: 'Non generee' }}</div>
                            <div><strong>Facture client:</strong> {{ $booking->invoice_original_name ?: 'Non televersee' }}</div>
                            <div><strong>Facture televersee le:</strong> {{ $booking->invoice_uploaded_at?->format('d/m/Y H:i') ?: 'Non televersee' }}</div>
                            <div><strong>ID:</strong> #{{ $booking->id }}</div>
                        </div>

                        <div class="entry-message">{{ $booking->message ?: 'Aucun message complementaire.' }}</div>

                        <form class="form-inline" method="POST" action="{{ route('admin.bookings.update', $booking) }}">
                            @csrf
                            @method('PATCH')
                            <select name="status" aria-label="Statut">
                                @foreach ($statusOptions as $status)
                                    <option value="{{ $status }}" @selected($booking->status === $status)>{{ ucfirst($status) }}</option>
                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-primary">Mettre a jour</button>
                            @if ($booking->invoice_file_path)
                                <a class="btn" href="{{ route('admin.bookings.invoice.download', $booking) }}">Telecharger facture client</a>
                            @endif
                        </form>
                    </article>
                @empty
                    <div class="panel">
                        <p class="meta">Aucune demande de rendez-vous enregistree.</p>
                    </div>
                @endforelse
            </section>

            @include('admin.partials.pagination', ['paginator' => $bookings])
        </main>
    </div>
@endsection
