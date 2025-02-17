export const detectPushUp = (landmarks: any): boolean => {
    if (!landmarks) return false;

    // Example: Using shoulder (11), elbow (13), and wrist (15) to calculate the angle
    const shoulder = landmarks[11];
    const elbow = landmarks[13];
    const wrist = landmarks[15];

    if (!shoulder || !elbow || !wrist) return false;

    // Calculate the angle between the elbow and wrist relative to the shoulder
    const angle =
        Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x) -
        Math.atan2(shoulder.y - elbow.y, shoulder.x - elbow.x);
    const angleDegrees = Math.abs((angle * 180) / Math.PI);

    // Simple logic: if the angle between the elbow and wrist is less than 50 degrees, it's a push-up
    if (angleDegrees < 50) {
        return true; // Push-up detected
    }

    return false; // No push-up detected
};
