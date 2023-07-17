interface CircleFromPoint {
  (
    lat: number,
    lng: number,
    rad: number,
    details?: number
  ): { lat: number; lng: number }[];
}

export const getCircleFromPoint: CircleFromPoint = (
  lat,
  lng,
  rad,
  details = 24
) => {
  const points: { lat: number; lng: number }[] = [];

  const r = 6378.1; // Radius of the Earth

  const pi = Math.PI; // Maths PI value

  const _lat = (lat * pi) / 180; // Convert degrees to radians
  const _lng = (lng * pi) / 180; // Convert degrees to radians

  const d = rad / 1000 / r; // Distance in radians

  let i = 0;

  for (i = 0; i <= 360; i += details) {
    const brng = (i * pi) / 180;

    let pLat = Math.asin(
      Math.sin(_lat) * Math.cos(d) +
        Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
    );
    const pLng =
      ((_lng +
        Math.atan2(
          Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
          Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
        )) *
        180) /
      pi;
    pLat = (pLat * 180) / pi;

    if (isNaN(pLat) || isNaN(pLng)) {
      continue; // Skip null points
    }

    points.push({ lat: pLat, lng: pLng });
  }

  return points;
};
