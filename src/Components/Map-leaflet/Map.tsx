// @ts-nocheck
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { usePosition } from '../hooks/usePosition';
import { useEffect, useState } from 'react';

import { useMap } from 'react-leaflet';
type mapCoords = [number, number];

const Map = () => {
  const { latitude, longitude, error } = usePosition();

  const [mapCenter, setMapCenter] = useState<mapCoords>([41.902782, 12.496366]);

  useEffect(() => {
    if (latitude && longitude) setMapCenter([latitude, longitude]);
  }, []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={false}
      className='h-full rounded-lg'>
      <TileLayer
        className='hidden dark:block '
        url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <TileLayer
        className='block dark:hidden'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />

      <Marker position={mapCenter}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
