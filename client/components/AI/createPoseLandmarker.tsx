'use client';
import React, { useRef, useState } from 'react';
import { usePoseLandmarker } from '@/hooks/usePoseLandMarker';
import { drawPose } from '@/components/AI/drawPose';
import { Button } from '@/components/ui/button';

export const PoseLandmarkerComponent = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoOn, setVideoOn] = useState(false);
    const poseLandmarker = usePoseLandmarker();

    const enableWebcam = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            console.error('Webcam not supported!');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            setVideoOn(true);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    detectPose(); // Start pose detection
                };
            }
        } catch (error) {
            console.error('Error accessing webcam: ', error);
        }
    };

    const detectPose = async () => {
        if (
            !poseLandmarker ||
            !videoRef.current ||
            !canvasRef.current
        )
            return;

        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const processFrame = async () => {
            if (!videoRef.current || !poseLandmarker) return;

            const results = await poseLandmarker.detectForVideo(
                videoRef.current,
                performance.now()
            );

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            if (results.landmarks.length > 0) {
                drawPose(ctx, results.landmarks[0]);
            }

            requestAnimationFrame(processFrame);
        };

        processFrame();
    };

    return (
        <div className="relative w-[500px] h-[400px] border-2 rounded-xl flex justify-center items-center">
            <video
                ref={videoRef}
                className={`${
                    videoOn ? 'block' : 'hidden'
                } absolute w-full h-full`}
                autoPlay
                playsInline
            />
            <canvas
                ref={canvasRef}
                className={`${
                    videoOn ? 'block' : 'hidden'
                } absolute w-full h-full object-cover `}
                width={500}
                height={500}
            />
            <Button
                className={`${videoOn ? 'hidden' : 'block'} absolute`}
                onClick={enableWebcam}
            >
                Enable Webcam
            </Button>
        </div>
    );
};
