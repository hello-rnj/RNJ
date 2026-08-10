@if ($paginator->hasPages())
    <div class="pagination">
        @if ($paginator->onFirstPage())
            <span class="badge">Debut de liste</span>
        @else
            <a class="btn btn-secondary" href="{{ $paginator->previousPageUrl() }}">Page precedente</a>
        @endif

        @if ($paginator->hasMorePages())
            <a class="btn btn-primary" href="{{ $paginator->nextPageUrl() }}">Page suivante</a>
        @else
            <span class="badge">Fin de liste</span>
        @endif
    </div>
@endif
