// Haversine formula to calculate distance between two points on the Earth
export function calculateDistance(
  pos1: { lat: number; lng: number },
  pos2: { lat: number; lng: number }
) {
  const R = 6371; // Earth radius in kilometers
  const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
  const dLon = (pos2.lng - pos1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(pos1.lat * (Math.PI / 180)) *
      Math.cos(pos2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export function sortByDistance<T extends Pick<ClinicPage, "location">>(
  currentLocation: { coordinates: { lat: number; lng: number } },
  list: T[]
) {
  list.sort((point1, point2) => {
    const distance1 = calculateDistance(
      currentLocation.coordinates,
      point1.location.location
    );
    const distance2 = calculateDistance(
      currentLocation.coordinates,
      point2.location.location
    );
    return distance1 - distance2;
  });

  return list;
}
