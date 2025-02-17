import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithGoogle, GOOGLE_CLIENT_ID } from '@/lib/auth';

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    renderButton: (
                        element: HTMLElement,
                        config: any
                    ) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

export function useGoogleLogin() {
    const router = useRouter();

    const handleCredentialResponse = useCallback(
        async (response: any) => {
            try {
                await loginWithGoogle(response.credential);
                router.push('/dashboard');
            } catch (error) {
                console.error('Google login failed:', error);
            }
        },
        [router]
    );

    useEffect(() => {
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            });
        }
    }, [handleCredentialResponse]);

    const handleGoogleLogin = useCallback(() => {
        if (window.google) {
            window.google.accounts.id.prompt();
        }
    }, []);

    return { handleGoogleLogin };
}
