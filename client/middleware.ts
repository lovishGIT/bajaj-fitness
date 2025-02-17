import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const protectedPaths = ['/activity-ai'];

    const path = request.nextUrl.pathname;

    if (protectedPaths.some((prefix) => path.startsWith(prefix))) {
        const token = request.cookies.get('auth-token');

        if (!token || !verifyAuth(token.value)) {
            return NextResponse.redirect(
                new URL('/auth', request.url)
            );
        }
    }

    return NextResponse.next();
}
