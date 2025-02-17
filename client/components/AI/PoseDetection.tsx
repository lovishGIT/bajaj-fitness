// components/PoseCanvas.tsx
import { useEffect, useRef } from 'react';
import { drawPose } from '@/components/AI/drawPose';
import { PoseLandmarker } from '@mediapipe/tasks-vision';

interface PoseCanvasProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    poseLandmarker: PoseLandmarker | null;
    onLandmarksDetected: (landmarks: any) => void;
    isWebcamOn: boolean;
}

export const PoseCanvas = ({
    videoRef,
    poseLandmarker,
    onLandmarksDetected,
    isWebcamOn,
}: PoseCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!isWebcamOn) return;

        let animationFrameId: number;
        const ctx = canvasRef.current?.getContext('2d');

        const processFrame = async () => {
            if (
                !videoRef.current ||
                !poseLandmarker ||
                !ctx ||
                !canvasRef.current
            )
                return;

            const results = await poseLandmarker.detectForVideo(
                videoRef.current,
                performance.now()
            );

            ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            if (results.landmarks.length > 0) {
                drawPose(ctx, results.landmarks[0]);
                onLandmarksDetected(results.landmarks[0]);
            }

            animationFrameId = requestAnimationFrame(processFrame);
        };

        processFrame();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [videoRef, poseLandmarker, isWebcamOn, onLandmarksDetected]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute w-full h-full object-cover ${
                isWebcamOn ? 'block' : 'hidden'
            }`}
            width={500}
            height={500}
        />
    );
};
