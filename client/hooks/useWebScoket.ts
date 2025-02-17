'use client';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from '@/lib/auth';

interface WebSocketMessage {
    type: string;
    count?: number;
}

export const useWebSocket = () => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [pushUpCount, setPushUpCount] = useState(0);

    useEffect(() => {
        socketRef.current = new WebSocket(`${API_URL}`);

        socketRef.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket connected');
        };

        socketRef.current.onmessage = (event) => {
            try {
                const data: WebSocketMessage = JSON.parse(event.data);
                if (data.type === 'pushup_detected' && data?.count) {
                    setPushUpCount((prev) => prev + (data?.count as number) || 0);
                }
            } catch (error) {
                console.error(
                    'Error parsing WebSocket message:',
                    error
                );
            }
        };

        socketRef.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket disconnected');
        };

        return () => {
            socketRef.current?.close();
        };
    }, []);

    const sendLandmarks = (landmarks: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(
                JSON.stringify({
                    type: 'pushup',
                    landmarks,
                })
            );
        }
    };

    return {
        isConnected,
        pushUpCount,
        sendLandmarks,
    };
};
