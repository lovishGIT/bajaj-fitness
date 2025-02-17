'use client';
import { usePoseLandmarker } from '@/hooks/usePoseLandMarker';
import { useWebSocket } from '@/hooks/useWebScoket';
import { useWebcam } from '@/hooks/useWebcam';
import { Button } from '@/components/ui/button';
import { PoseCanvas } from '@/components/AI/poseDetection';

export const PoseLandmarkerComponent = () => {
    const poseLandmarker = usePoseLandmarker();
    const { videoRef, isWebcamOn, error, enableWebcam } = useWebcam();
    const { isConnected, pushUpCount, sendLandmarks } = useWebSocket();

    const handleLandmarksDetected = (landmarks: any) => {
        sendLandmarks(landmarks);
    };

    return (
        <div className="relative w-[500px] h-[400px] border-2 rounded-xl flex justify-center items-center">
            <video
                ref={videoRef}
                className={`${
                    isWebcamOn ? 'block' : 'hidden'
                } absolute w-full h-full`}
                autoPlay
                playsInline
            />

            <PoseCanvas
                videoRef={videoRef}
                poseLandmarker={poseLandmarker}
                onLandmarksDetected={handleLandmarksDetected}
                isWebcamOn={isWebcamOn}
            />

            {!isWebcamOn && (
                <Button
                    className="absolute"
                    onClick={enableWebcam}
                    disabled={!isConnected}
                >
                    Enable Webcam
                </Button>
            )}

            <div className="absolute bottom-5 text-white">
                Push-up Count: {pushUpCount}
            </div>

            {error && (
                <div className="absolute top-5 text-red-500">
                    {error}
                </div>
            )}

            {!isConnected && (
                <div className="absolute top-5 text-yellow-500">
                    Connecting to server...
                </div>
            )}
        </div>
    );
};
