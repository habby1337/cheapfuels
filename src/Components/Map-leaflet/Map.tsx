// @ts-nocheck
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { usePosition } from '../hooks/usePosition';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';

import { useStore } from '@/Shared/Store/store';

import icons from '@/Shared/Constants/icons';

import { useMap } from 'react-leaflet';

type mapCoords = [number, number];

const Map = () => {
  const { latitude, longitude, error } = usePosition();

  const [mapCenter, setMapCenter] = useState<mapCoords>([41.902782, 12.496366]);
  useEffect(() => {
    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
  }, []);

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        gestureHandling={true}
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

        <FuelStationsMarkers />
        <CenterMapOnPosition />
      </MapContainer>
    </>
  );
};

export default Map;

const FuelStationsMarkers = () => {
  const map = useMap();
  const brandList = useStore((state) => state.brandList);
  const fuelStations = useStore((state) => state.fuelStations);

  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getFuelStationIcon = (fuelStation) => {
    const currentFuelStation = fuelStation.brand.toLowerCase();

    const brand = brandList.find(
      (brand) => brand.bandiera.toLowerCase() === currentFuelStation
    );

    if (!brand)
      return L.icon({
        iconUrl: icons.fuelingStation,
        iconSize: [15, 15],
        iconAnchor: [20, 6],
        popupAnchor: [0, -6],
      });

    // const lastLogo = brand.logoMarkerList[brand.logoMarkerList.length - 1];
    const th2Logo = brand.logoMarkerList.find(
      (logo) => logo.tipoFile === 'th2'
    );
    const base64Content = th2Logo?.content || 'base';
    const imageExtension = th2Logo?.estensione || 'svg';

    // console.log(`data:image/${imageExtension};base64,${base64Content}`);
    // return `data:image/${imageExtension};base64,${base64Content}`;
    return L.icon({
      iconUrl: `data:image/${imageExtension};base64,${base64Content}`,
      iconSize: [25, 25],
      iconAnchor: [20, 6],
      popupAnchor: [0, -6],
    });
  };

  // Inside FuelStationsMarkers component
  useEffect(() => {
    // check if fuelStation is empty object or result is empty array
    if (
      Object.keys(fuelStations).length === 0 ||
      fuelStations?.results?.length === 0
    )
      return;

    if (fuelStations.success === false)
      return console.log('fuelStations error:', fuelStations.error);

    const markers = fuelStations.results.map((fuelStation) => {
      const { lat, lng } = fuelStation.location;

      const icon = getFuelStationIcon(fuelStation);

      const marker = L.marker([lat, lng], {
        icon: icon,
      });

      marker.bindPopup(
        ReactDOMServer.renderToString(<FuelStationPopup {...fuelStation} />)
      );

      marker.on('mouseover', (e) => {
        e.target.openPopup();
      });

      marker.on('click', () => {
        map.setView([lat, lng], 15);
      });

      marker.addTo(map);

      return marker;
    });
  }, [fuelStations, brandList]);
};

const FuelStationPopup = ({ fuelStation }) => {
  const shortenText = (text, maxLength) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + '...';
  };

  return <></>;
};

const CenterMapOnPosition = () => {
  const map = useMap();
  const { latitude, longitude, error } = usePosition();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 13);
      map.panTo([latitude, longitude], {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
        noMoveStart: true,
      });
      L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: icons.car,
          iconSize: [30, 25],
          iconAnchor: [20, 6],
          popupAnchor: [0, -6],
        }),
      }).addTo(map);
    }
  }, [latitude, longitude]);

  return null;
};
