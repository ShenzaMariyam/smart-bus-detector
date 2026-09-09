export function calculateDistance(
    latitude1,
    longitude1,
    latitude2,
    longitude2
) {
    const earthRadius = 6371;

    const latDifference =
        (latitude2 - latitude1) * Math.PI / 180;

    const lonDifference =
        (longitude2 - longitude1) * Math.PI / 180;

    const a =
        Math.sin(latDifference / 2) *
        Math.sin(latDifference / 2) +
        Math.cos(latitude1 * Math.PI / 180) *
        Math.cos(latitude2 * Math.PI / 180) *
        Math.sin(lonDifference / 2) *
        Math.sin(lonDifference / 2);

    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

    return earthRadius * c;
}

export function calculateETA(distanceKm, speedKmh) {
    if (speedKmh <= 0) {
        return null;
    }

    const timeHours = distanceKm / speedKmh;

    const timeMinutes = timeHours * 60;

    return Math.ceil(timeMinutes);
}