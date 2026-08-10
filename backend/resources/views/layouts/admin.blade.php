<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'RNJ Admin')</title>
    <style>
        :root {
            color-scheme: light;
            --bg: #f4f6ea;
            --surface: #ffffff;
            --surface-soft: #eef2ca;
            --border: #d7dfb3;
            --text: #123212;
            --muted: #5a6f5a;
            --accent: #bbcb2e;
            --accent-dark: #406640;
            --danger: #9b1c1c;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: var(--text);
            background: linear-gradient(180deg, #f8fbef 0%, var(--bg) 100%);
        }
        a { color: inherit; text-decoration: none; }
        .shell { min-height: 100vh; display: grid; grid-template-columns: 260px minmax(0, 1fr); }
        .sidebar {
            padding: 32px 24px;
            background: #173d17;
            color: #eff5da;
        }
        .brand {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .subtitle {
            color: rgba(239, 245, 218, 0.72);
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 28px;
        }
        .nav-link {
            display: block;
            padding: 14px 16px;
            border-radius: 16px;
            margin-bottom: 10px;
            background: rgba(255,255,255,0.04);
            color: rgba(239, 245, 218, 0.88);
            font-weight: 600;
        }
        .nav-link.active {
            background: var(--accent);
            color: #173d17;
        }
        .logout-btn {
            width: 100%;
            margin-top: 18px;
            border: 0;
            border-radius: 16px;
            padding: 14px 16px;
            font-weight: 700;
            background: rgba(255,255,255,0.12);
            color: #eff5da;
            cursor: pointer;
        }
        .content { padding: 36px; }
        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            margin-bottom: 28px;
        }
        .page-title {
            margin: 0;
            font-size: 36px;
            line-height: 1.1;
        }
        .page-copy {
            margin: 8px 0 0;
            color: var(--muted);
            line-height: 1.6;
        }
        .panel {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 24px;
            box-shadow: 0 12px 36px rgba(18, 50, 18, 0.08);
        }
        .flash {
            padding: 14px 18px;
            border-radius: 16px;
            margin-bottom: 18px;
            background: #edf7d1;
            border: 1px solid #d0dea3;
        }
        .errors {
            padding: 14px 18px;
            border-radius: 16px;
            margin-bottom: 18px;
            background: #fdeaea;
            border: 1px solid #f3b4b4;
            color: var(--danger);
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px;
            margin-bottom: 22px;
        }
        .stat-card {
            border-radius: 22px;
            padding: 22px;
            background: linear-gradient(145deg, #ffffff 0%, #f6f8e9 100%);
            border: 1px solid var(--border);
        }
        .stat-label {
            color: var(--muted);
            font-size: 14px;
            margin-bottom: 10px;
        }
        .stat-value {
            font-size: 34px;
            font-weight: 700;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }
        .list {
            display: grid;
            gap: 14px;
        }
        .list-item {
            border: 1px solid var(--border);
            border-radius: 18px;
            padding: 16px;
            background: #fbfcf5;
        }
        .list-title {
            margin: 0 0 6px;
            font-size: 18px;
        }
        .meta {
            margin: 0;
            color: var(--muted);
            line-height: 1.5;
            font-size: 14px;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 700;
            background: var(--surface-soft);
            color: var(--accent-dark);
        }
        .table-stack {
            display: grid;
            gap: 18px;
        }
        .entry {
            border: 1px solid var(--border);
            border-radius: 22px;
            padding: 20px;
            background: #fcfdf7;
        }
        .entry-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 14px;
        }
        .entry-title {
            margin: 0 0 8px;
            font-size: 22px;
        }
        .entry-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 18px;
            margin-bottom: 14px;
        }
        .entry-message {
            padding: 14px 16px;
            border-radius: 16px;
            background: #f4f6ea;
            border: 1px solid var(--border);
            line-height: 1.6;
            white-space: pre-wrap;
        }
        .form-inline {
            display: flex;
            gap: 10px;
            margin-top: 16px;
            flex-wrap: wrap;
        }
        select, input, button {
            font: inherit;
        }
        select, input[type="email"], input[type="password"] {
            width: 100%;
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 12px 14px;
            background: #fff;
        }
        .btn {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            border: 0;
            border-radius: 14px;
            padding: 12px 18px;
            cursor: pointer;
            font-weight: 700;
        }
        .btn-primary {
            background: var(--accent);
            color: #173d17;
        }
        .btn-secondary {
            background: #173d17;
            color: #eff5da;
        }
        .pagination {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-top: 22px;
        }
        .login-shell {
            min-height: 100vh;
            display: grid;
            place-items: center;
            padding: 24px;
        }
        .login-card {
            width: min(100%, 460px);
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 30px;
            padding: 32px;
            box-shadow: 0 16px 48px rgba(18, 50, 18, 0.12);
        }
        .login-card h1 {
            margin: 0 0 10px;
            font-size: 34px;
        }
        .login-card p {
            margin: 0 0 24px;
            color: var(--muted);
            line-height: 1.6;
        }
        .field {
            margin-bottom: 16px;
        }
        .field label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 700;
        }
        @media (max-width: 1100px) {
            .shell { grid-template-columns: 1fr; }
            .sidebar { padding-bottom: 20px; }
            .stats, .grid-2, .entry-grid { grid-template-columns: 1fr; }
            .content { padding: 22px; }
        }
    </style>
</head>
<body>
    @yield('body')
</body>
</html>
