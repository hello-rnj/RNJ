@extends('layouts.admin')

@section('title', 'Contacts admin')

@section('body')
    <div class="shell">
        @include('admin.partials.sidebar')

        <main class="content">
            <div class="topbar">
                <div>
                    <h1 class="page-title">Messages de contact</h1>
                    <p class="page-copy">Consultez les messages envoyes depuis le formulaire de contact public.</p>
                </div>
                <span class="badge">{{ $contacts->total() }} contact(s)</span>
            </div>

            @if (session('status'))
                <div class="flash">{{ session('status') }}</div>
            @endif

            @if ($errors->any())
                <div class="errors">{{ $errors->first() }}</div>
            @endif

            <section class="table-stack">
                @forelse ($contacts as $contact)
                    <article class="entry">
                        <div class="entry-head">
                            <div>
                                <h2 class="entry-title">{{ $contact->name }}</h2>
                                <p class="meta">{{ $contact->subject }} · Recu le {{ $contact->created_at?->format('d/m/Y H:i') }}</p>
                            </div>
                            <span class="badge">{{ $contact->status }}</span>
                        </div>

                        <div class="entry-grid">
                            <div><strong>Email:</strong> {{ $contact->email }}</div>
                            <div><strong>Telephone:</strong> {{ $contact->phone }}</div>
                            <div><strong>Societe:</strong> {{ $contact->company ?: 'Non renseignee' }}</div>
                            <div><strong>ID:</strong> #{{ $contact->id }}</div>
                        </div>

                        <div class="entry-message">{{ $contact->message }}</div>

                        <form class="form-inline" method="POST" action="{{ route('admin.contacts.update', $contact) }}">
                            @csrf
                            @method('PATCH')
                            <select name="status" aria-label="Statut">
                                @foreach ($statusOptions as $status)
                                    <option value="{{ $status }}" @selected($contact->status === $status)>{{ ucfirst($status) }}</option>
                                @endforeach
                            </select>
                            <button type="submit" class="btn btn-primary">Mettre a jour</button>
                        </form>
                    </article>
                @empty
                    <div class="panel">
                        <p class="meta">Aucun message de contact enregistre.</p>
                    </div>
                @endforelse
            </section>

            @include('admin.partials.pagination', ['paginator' => $contacts])
        </main>
    </div>
@endsection
