import { MapContainer, TileLayer } from 'react-leaflet';
import { usePosition } from '../hooks/usePosition';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import ReactDOMServer from 'react-dom/server';
import L, { Marker } from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import { Slide, toast } from 'react-toastify';

import { useStore } from '@/Shared/Store/store';

// @ts-ignore
import icons from '@/Shared/Constants/icons.js';

import { useMap } from 'react-leaflet';
import {
  FuelStation,
  customServiceAreaSearchResponse,
} from '@/Shared/Interfaces/interfaces';
import { BrandLogo, LogoMarker } from 'osservaprezzi-carburanti-node';

const Map = () => {
  const { latitude, longitude } = usePosition();
  useEffect(() => {
    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
  }, []);

  return (
    <>
      <MapContainer
        center={[latitude || 41.902782, longitude || 12.496366]}
        zoom={13}
        scrollWheelZoom={false}
        // @ts-ignore added gestureHandling lib
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
        <CenterMapOnUserPosition />
      </MapContainer>
    </>
  );
};

export default Map;

const FuelStationsMarkers = (): any => {
  const map = useMap();
  const brandList: BrandLogo[] = useStore((state) => state.brandList);
  const fuelStations: customServiceAreaSearchResponse = useStore(
    (state) => state.fuelStations
  );

  const shortenText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getFuelStationIcon = (fuelStation: FuelStation) => {
    if (!fuelStation) return;
    const currentFuelStation = fuelStation.brand.toLowerCase();

    if (!brandList) return toast.error('Errore nel caricamento dei brand');

    const brand: BrandLogo | undefined = brandList.find(
      (brand) => brand.bandiera.toLowerCase() === currentFuelStation
    );

    if (!brand)
      return L.icon({
        iconUrl: icons.fuelingStation,
        iconSize: [15, 15],
        iconAnchor: [20, 6],
        popupAnchor: [0, -6],
      });

    const th2Logo: LogoMarker | undefined = brand.logoMarkerList.find(
      (logo: LogoMarker) => logo.tipoFile === 'th2'
    );
    const base64Content = th2Logo?.content || 'base';
    const imageExtension = th2Logo?.estensione || 'svg';

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

    if (fuelStations.success === false || !fuelStations)
      toast.error('Errore nel caricamento delle stazioni di servizio');

    if (fuelStations.success === true && fuelStations.results.length != 0) {
      fuelStations.results.map((fuelStation) => {
        const { lat, lng } = fuelStation.location;

        const icon = getFuelStationIcon(fuelStation);

        const marker = L.marker([lat, lng], {
          // @ts-ignore
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
    }
  }, [fuelStations, brandList]);
};

const FuelStationPopup = ({ fuelStation }: any) => {
  const shortenText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + '...';
  };

  return <></>;
};

const CenterMapOnUserPosition = () => {
  const map = useMap();
  const carMarkerRef: MutableRefObject<Marker | null> = useRef(null);
  const { latitude, longitude } = usePosition();

  const addCarMarker = () => {
    if (!latitude && !longitude) {
      toast.loading('Looking for your position...', {
        autoClose: false,
        transition: Slide,
        hideProgressBar: false,
        closeButton: false,
        position: 'bottom-center',
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        toastId: 'userPositionToast',
      });
      return;
    } else {
      //check if marker already exists
      if (carMarkerRef.current) {
        map.removeLayer(carMarkerRef.current);
      }

      carMarkerRef.current = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: icons.car,
          iconSize: [30, 25],
          iconAnchor: [20, 6],
          popupAnchor: [0, -6],
        }),
      }).addTo(map);

      map.panTo([latitude, longitude], {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
        noMoveStart: true,
      });
      toast.update('userPositionToast', {
        render: 'Found your position!',
        type: 'success',
        isLoading: false,
        autoClose: 1000,
        transition: Slide,
        hideProgressBar: false,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    addCarMarker();
  }, [latitude, longitude]);

  return null;
};
