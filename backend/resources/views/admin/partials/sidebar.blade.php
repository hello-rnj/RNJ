<aside class="sidebar">
    <div class="brand">RNJ Admin</div>
    <div class="subtitle">Tableau de bord Laravel pour les messages de contact et les demandes de rendez-vous.</div>

    <nav>
        <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">Dashboard</a>
        <a href="{{ route('admin.contacts.index') }}" class="nav-link {{ request()->routeIs('admin.contacts.*') ? 'active' : '' }}">Contacts</a>
        <a href="{{ route('admin.bookings.index') }}" class="nav-link {{ request()->routeIs('admin.bookings.*') ? 'active' : '' }}">Rendez-vous</a>
    </nav>

    <form method="POST" action="{{ route('logout') }}">
        @csrf
        <button type="submit" class="logout-btn">Se deconnecter</button>
    </form>
</aside>
