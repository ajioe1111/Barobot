
export function getNotificationTimeout(time, beforeMinutes) {
    let targetDate = new Date();
    let HMS = time.split(':');
    targetDate.setHours(HMS[0]);
    targetDate.setMinutes(HMS[1] - beforeMinutes);
    targetDate.setSeconds(HMS[2]);

    if (targetDate < new Date())
        targetDate = new Date(targetDate.getDate() + 1);

    let dateDiff = targetDate - new Date();
    return dateDiff;
}