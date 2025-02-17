// hooks/useWebcam.ts
import { useRef, useState } from 'react';

export const useWebcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isWebcamOn, setIsWebcamOn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const enableWebcam = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            setError('Webcam not supported!');
            return null;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsWebcamOn(true);
                return stream;
            }
        } catch (error) {
            setError('Error accessing webcam');
            console.error('Error accessing webcam: ', error);
        }
        return null;
    };

    const disableWebcam = () => {
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setIsWebcamOn(false);
        }
    };

    return {
        videoRef,
        isWebcamOn,
        error,
        enableWebcam,
        disableWebcam,
    };
};
