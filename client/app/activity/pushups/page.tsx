import React from 'react';
import { PoseLandmarkerComponent } from '@/components/AI/createPoseLandmarker';

const PushupCounter: React.FC = () => {
    return (
        <div className="flex gap-4 items-center justify-center p-5">
            <div className="pr-5">
                <h1>Pushup Counter</h1>
                <p>Track your pushups and improve your fitness!</p>
            </div>
            <div className=''>
                <PoseLandmarkerComponent />
            </div>
        </div>
    );
};

export default PushupCounter;
