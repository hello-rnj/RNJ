import { NextRequest } from 'next/server';
import { forwardToLaravel } from '@/lib/laravel-api';

export async function POST(request: NextRequest) {
  return forwardToLaravel(request, '/bookings');
}
