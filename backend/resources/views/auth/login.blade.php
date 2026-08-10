@extends('layouts.admin')

@section('title', 'Connexion admin')

@section('body')
    <div class="login-shell">
        <div class="login-card">
            <h1>RNJ Admin</h1>
            <p>Connectez-vous pour consulter les demandes de contact et les rendez-vous enregistres par le site.</p>

            @if ($errors->any())
                <div class="errors">
                    {{ $errors->first() }}
                </div>
            @endif

            <form method="POST" action="{{ route('login.store') }}">
                @csrf
                <div class="field">
                    <label for="email">Adresse email</label>
                    <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
                </div>

                <div class="field">
                    <label for="password">Mot de passe</label>
                    <input id="password" type="password" name="password" required>
                </div>

                <div class="field">
                    <label style="display:flex;align-items:center;gap:10px;margin:0;">
                        <input type="checkbox" name="remember" value="1" style="width:auto;">
                        Rester connecte
                    </label>
                </div>

                <button type="submit" class="btn btn-primary" style="width:100%;">Se connecter</button>
            </form>
        </div>
    </div>
@endsection
