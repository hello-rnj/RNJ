@extends('layouts.admin')

@section('title', 'Dashboard admin')

@section('body')
    <div class="shell">
        @include('admin.partials.sidebar')

        <main class="content">
            <div class="topbar">
                <div>
                    <h1 class="page-title">Dashboard</h1>
                    <p class="page-copy">Vue rapide sur les nouveaux contacts et les demandes de rendez-vous en attente.</p>
                </div>
                <span class="badge">Connecte en tant que {{ auth()->user()->email }}</span>
            </div>

            <section class="stats">
                <div class="stat-card">
                    <div class="stat-label">Nouveaux contacts</div>
                    <div class="stat-value">{{ $stats['new_contacts'] }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Rendez-vous en attente</div>
                    <div class="stat-value">{{ $stats['pending_bookings'] }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total contacts</div>
                    <div class="stat-value">{{ $stats['total_contacts'] }}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total rendez-vous</div>
                    <div class="stat-value">{{ $stats['total_bookings'] }}</div>
                </div>
            </section>

            <section class="grid-2">
                <div class="panel">
                    <h2 style="margin-top:0;">Derniers contacts</h2>
                    <div class="list">
                        @forelse ($latestContacts as $contact)
                            <div class="list-item">
                                <h3 class="list-title">{{ $contact->name }} <span class="badge">{{ $contact->status }}</span></h3>
                                <p class="meta">{{ $contact->subject }} · {{ $contact->email }} · {{ $contact->created_at?->format('d/m/Y H:i') }}</p>
                            </div>
                        @empty
                            <p class="meta">Aucun contact pour le moment.</p>
                        @endforelse
                    </div>
                </div>

                <div class="panel">
                    <h2 style="margin-top:0;">Derniers rendez-vous</h2>
                    <div class="list">
                        @forelse ($latestBookings as $booking)
                            <div class="list-item">
                                <h3 class="list-title">
                                    {{ $booking->name }}
                                    <span class="badge">{{ $booking->status }}</span>
                                    <span class="badge">{{ $booking->payment_status }}</span>
                                </h3>
                                <p class="meta">
                                    {{ $booking->subject }} ·
                                    {{ $booking->preferred_date?->format('d/m/Y') }}
                                    @if ($booking->preferred_time)
                                        · {{ $booking->preferred_time }}
                                    @endif
                                    @if ($booking->payment_amount)
                                        · {{ number_format($booking->payment_amount / 100, 2, ',', ' ') }} {{ strtoupper((string) $booking->payment_currency) }}
                                    @endif
                                </p>
                            </div>
                        @empty
                            <p class="meta">Aucun rendez-vous pour le moment.</p>
                        @endforelse
                    </div>
                </div>
            </section>
        </main>
    </div>
@endsection
