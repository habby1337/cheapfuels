import { useState, useEffect } from 'react';

interface Position {
  latitude: number;
  longitude: number;
}

interface PositionError {
  code?: number;
  message: string;
}

interface OnChange {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface UsePosition {
  latitude: number;
  longitude: number;
  error: null | string;
}

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState<null | string>(null);

  const onChange = ({ coords }: OnChange) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    } as Position);
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    const watcher = geo.watchPosition(onChange, onError, {
      enableHighAccuracy: true,
      maximumAge: 6000,
    });
    return () => geo.clearWatch(watcher);
  }, []);
  return { ...position, error } as UsePosition;
};
