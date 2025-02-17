'use client';
import { useEffect, useState } from 'react';
import {
    FilesetResolver,
    PoseLandmarker,
} from '@mediapipe/tasks-vision';

export const usePoseLandmarker = () => {
    const [poseLandmarker, setPoseLandmarker] =
        useState<PoseLandmarker | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            const vision = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );

            const landmarker = await PoseLandmarker.createFromOptions(
                vision,
                {
                    baseOptions: {
                        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
                        delegate: 'GPU',
                    },
                    runningMode: 'VIDEO',
                    numPoses: 1,
                }
            );

            setPoseLandmarker(landmarker);
        };

        loadModel();
    }, []);

    return poseLandmarker;
};
