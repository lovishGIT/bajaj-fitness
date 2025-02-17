export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name?: string;
        isGuest: boolean;
    };
}

export async function loginWithEmail(
    email: string,
    password: string
): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Login failed');
    }

    return res.json();
}

export async function registerWithEmail(data: {
    email: string;
    password: string;
    name: string;
}): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Registration failed');
    }

    return res.json();
}

export async function loginAsGuest(): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/guest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Guest login failed');
    }

    return res.json();
}

export async function loginWithGoogle(
    credential: string
): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Google login failed');
    }

    return res.json();
}

export async function logout() {
    await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
}

export async function verifyAuth(
    token: string
): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Token verification failed');
    }

    return res.json();
}
