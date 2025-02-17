import { NextApiRequest, NextApiResponse } from 'next';

let pushUpCount = 0;
let prevPosition = 'up';

/** Function to detect push-ups from landmarks */
const detectPushUp = (landmarks: any) => {
    const shoulder = landmarks[11]; // Left Shoulder
    const elbow = landmarks[13]; // Left Elbow
    const wrist = landmarks[15]; // Left Wrist

    if (!shoulder || !elbow || !wrist) return pushUpCount;

    // Calculate angle between shoulder, elbow, and wrist
    const angle =
        Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x) -
        Math.atan2(shoulder.y - elbow.y, shoulder.x - elbow.x);

    const angleDegrees = Math.abs((angle * 180) / Math.PI);

    if (angleDegrees < 50 && prevPosition === 'up') {
        prevPosition = 'down';
    } else if (angleDegrees > 120 && prevPosition === 'down') {
        prevPosition = 'up';
        pushUpCount++;
    }

    return pushUpCount;
};

/** API route to process pose data */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { landmarks } = req.body;

        if (!landmarks) {
            return res
                .status(400)
                .json({ error: 'No pose data provided' });
        }

        const count = detectPushUp(landmarks);

        return res.status(200).json({ count });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
