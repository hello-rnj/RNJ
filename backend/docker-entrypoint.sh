#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ]; then
  cp .env.example .env
fi

if ! grep -q '^APP_KEY=base64:' .env; then
  php artisan key:generate --force
fi

echo "Waiting for database at ${DB_HOST}:${DB_PORT}..."
until php -r '
try {
    new PDO(
        sprintf("mysql:host=%s;port=%s;dbname=%s", getenv("DB_HOST"), getenv("DB_PORT"), getenv("DB_DATABASE")),
        getenv("DB_USERNAME"),
        getenv("DB_PASSWORD")
    );
    exit(0);
} catch (Throwable $exception) {
    fwrite(STDERR, $exception->getMessage() . PHP_EOL);
    exit(1);
}
'; do
  sleep 2
done

php artisan migrate --force --seed
php artisan optimize:clear

exec php artisan serve --host=0.0.0.0 --port=8000
