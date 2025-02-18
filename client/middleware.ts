import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const protectedPaths = ['/activity', '/profile', '/settings'];

    const path = request.nextUrl.pathname;

    if (protectedPaths.some((prefix) => path.startsWith(prefix))) {

        if (!verifyAuth()) {
            return NextResponse.redirect(
                new URL('/auth')
            );
        }

        if (path.startsWith('/activity')) {
            return NextResponse.redirect(
                new URL('/activity/pushups')
            );
        }
    }

    return NextResponse.next();
}
