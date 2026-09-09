export async function requestNotificationPermission() {
    if (!("Notification" in window)) {
        console.log(
            "❌ Browser notifications are not supported."
        );

        return false;
    }

    if (Notification.permission === "granted") {
        return true;
    }

    if (Notification.permission === "denied") {
        console.log(
            "❌ Notification permission was denied."
        );

        return false;
    }

    const permission =
        await Notification.requestPermission();

    if (permission === "granted") {
        console.log(
            "✅ Notification permission granted."
        );

        return true;
    }

    console.log(
        "❌ Notification permission not granted."
    );

    return false;
}

export function showBusNotification(
    busNumber,
    eta
) {
    if (!("Notification" in window)) {
        return;
    }

    if (Notification.permission !== "granted") {
        return;
    }

    new Notification(
        `🚌 Bus ${busNumber} is arriving soon!`,
        {
            body: `Estimated arrival: ${eta} minutes`
        }
    );
}