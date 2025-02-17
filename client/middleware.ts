import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const protectedPaths = ['/activity-ai', '/exercise'];

    const path = request.nextUrl.pathname;

    if (protectedPaths.some((prefix) => path.startsWith(prefix))) {
        const token = request.cookies.get('auth-token') || request.headers.get('Authorization') || request.cookies.get('token');

        if (!token || !verifyAuth(token.toString())) {
            return NextResponse.redirect(
                new URL('/auth')
            );
        }
    }

    return NextResponse.next();
}
