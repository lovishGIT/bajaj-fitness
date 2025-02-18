import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    const protectedPaths = ['/activity-ai', '/exercise'];

    const path = request.nextUrl.pathname;

    if (protectedPaths.some((prefix) => path.startsWith(prefix))) {

        if (!verifyAuth()) {
            return NextResponse.redirect(
                new URL('/auth')
            );
        }
    }

    return NextResponse.next();
}
