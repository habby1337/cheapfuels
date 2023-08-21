import { MapContainer, TileLayer } from "react-leaflet";
import { usePosition } from "../hooks/usePosition";
import { useEffect, useRef, MutableRefObject } from "react";
import ReactDOMServer from "react-dom/server";
import L, { Marker } from "leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import { Slide, toast } from "react-toastify";

import { useStore } from "@/Shared/Store/store";

import { icons } from "@/Shared/Constants/icons.js";
import { Fuel } from "lucide-react";

import { useMap } from "react-leaflet";
import {
  FuelStation,
  FuelStationObj,
  customServiceAreaSearchResponse,
} from "@/Shared/Interfaces/interfaces";
import { BrandLogo, LogoMarker } from "osservaprezzi-carburanti-node";

const Map = () => {
  const { latitude, longitude } = usePosition();
  useEffect(() => {
    L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
  }, []);

  return (
    <>
      <MapContainer
        center={[latitude || 41.902782, longitude || 12.496366]}
        zoom={13}
        scrollWheelZoom={false}
        // @ts-ignore added gestureHandling lib
        gestureHandling={true}
        className="h-full rounded-lg"
      >
        <TileLayer
          className="hidden dark:block "
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <TileLayer
          className="block dark:hidden"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
    (state) => state.fuelStations,
  );

  const shortenText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getFuelStationIcon = (fuelStation: FuelStation) => {
    if (!fuelStation) return;
    const currentFuelStation = fuelStation.brand.toLowerCase();

    if (!brandList) return toast.error("Errore nel caricamento dei brand");

    const brand: BrandLogo | undefined = brandList.find(
      (brand) => brand.bandiera.toLowerCase() === currentFuelStation,
    );

    if (!brand)
      return L.icon({
        iconUrl: icons.fuelingStation,
        iconSize: [15, 15],
        iconAnchor: [20, 6],
        popupAnchor: [0, -6],
      });

    const th2Logo: LogoMarker | undefined = brand.logoMarkerList.find(
      (logo: LogoMarker) => logo.tipoFile === "th2",
    );
    const base64Content = th2Logo?.content || "base";
    const imageExtension = th2Logo?.estensione || "svg";

    return L.icon({
      iconUrl: `data:image/${imageExtension};base64,${base64Content}`,
      iconSize: [25, 25],
      iconAnchor: [0, 0],
      popupAnchor: [0, 0],
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
      toast.error("Errore nel caricamento delle stazioni di servizio");

    if (fuelStations.success === true && fuelStations.results.length != 0) {
      fuelStations.results.map((fuelStation) => {
        const { lat, lng } = fuelStation.location;

        const icon = getFuelStationIcon(fuelStation);

        const marker = L.marker([lat, lng], {
          icon: icon as any,
        });

        marker.bindPopup(
          ReactDOMServer.renderToString(
            <FuelStationPopup fuelStation={fuelStation as any} />,
          ),
          {
            className: "custom-popup",
          },
        );

        marker.on("mouseover", (e) => {
          e.target.openPopup();
        });

        // marker.on('mouseout', (e) => {
        //   e.target.closePopup();
        // }); //TODO: Enable this

        marker.on("click", () => {
          map.setView([lat, lng], 15);
        });

        marker.addTo(map);

        return marker;
      });
    }
  }, [fuelStations, brandList]);
};

// TODO: Filter for vehicle fuel type
const FuelStationPopup = ({ fuelStation }: FuelStationObj) => {
  const shortenText = (text: string, maxLength: number) => {
    if (text?.length <= maxLength) return text;
    return text?.slice(0, maxLength) + "...";
  };

  const getIconColor = (fuelName: string) => {
    const FuelsTable = {
      Benzina: "purple",
      "HiQ Perform+": "purple",
      "Benzina Plus 98": "purple",
      "Benzina Shell V Power": "purple",
      "Benzina speciale": "purple",
      "Benzina WR 100": "purple",
      "Benzina 100 ottani": "purple",
      "Benzina 102 Ottani": "purple",

      Gasolio: "yellow",
      "Blue Super": "yellow",
      "Blue Diesel": "yellow",
      "Gasolio Premium": "yellow",
      "Supreme Diesel": "yellow",
      "Diesel Shell V Power": "yellow",

      "Gasolio Oro Diesel": "yellow",
      "Hi-Q Diesel": "yellow",
      "Excellium Diesel": "yellow",
      "E-DIESEL": "yellow",
      "Gasolio speciale": "yellow",
      "Blu Diesel Alpino": "yellow",
      "Gasolio Ecoplus": "yellow",
      "Diesel e+10": "yellow",
      "Gasolio Alpino": "yellow",
      "Excellium diesel": "yellow",
      DieselMax: "yellow",
      "Gasolio artico": "yellow",
      "S-Diesel": "yellow",
      "GP DIESEL": "yellow",
      "V-Power Diesel": "yellow",
      "Gasolio Prestazionale": "yellow",
      "Gasolio Gelo": "yellow",
      "Gasolio Artico": "yellow",

      GPL: "blue",
      Metano: "green",
      "L-GNC": "green",
      GNL: "green",
      R100: "green",
      "HVO Ecoplus": "green",
      HVOlution: "green",
      HVO: "green",

      "V-Power": "orange",
    };

    if (!FuelsTable[fuelName as keyof typeof FuelsTable])
      console.info(`[FuelISSUE] Fuel not found in table: ${fuelName}`);
    else return FuelsTable[fuelName as keyof typeof FuelsTable];
  };

  //create a popup card with fuelStation data
  return (
    <>
      <div className="flex flex-col justify-center w-full h-full ">
        <div className="flex flex-col items-center justify-center w-full h-full p-2">
          <img
            src={icons.fuelingStation}
            alt="fueling station"
            className="w-[40px] h-[40px] mb-3 rounded-full dark:border-white border-gray-700 border-2"
          />
          <h1 className="text-sm font-bold text-center ">
            {fuelStation.brand}
          </h1>
          <h2 className="text-xs italic text-center text-gray-600 dark:text-gray-400">
            {fuelStation.name}
          </h2>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col items-center justify-center w-1/2 h-full p-2 border-r border-gray-300 dark:border-gray-700">
            <h1 className="text-xs font-bold text-center text-gray-600 dark:text-gray-400">
              Self
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2 h-full p-2 border-gray-300 dark:border-gray-700">
            <h1 className="text-xs font-bold text-center text-gray-600 dark:text-gray-400">
              Served
            </h1>
            <div className="w-full mt-3">
              {fuelStation.fuels.map((fuel) => {
                if (fuel.isSelf === true) {
                  return (
                    <div
                      className="flex flex-row justify-center mb-2 text-xs italic text-gray-600 dark:text-gray-400"
                      key={fuel.name}
                    >
                      {/* icon */}
                      {/* create a tooltip */}
                      <span className="mr-1">
                        <Fuel color={getIconColor(fuel.name)} size={20} />
                      </span>
                      - {fuel.price} €
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CenterMapOnUserPosition = () => {
  const map = useMap();
  const carMarkerRef: MutableRefObject<Marker | null> = useRef(null);
  const { latitude, longitude } = usePosition();
  const setDisableSubmitButton = useStore(
    (state) => state.setDisableSubmitButton,
  );

  const addCarMarker = () => {
    if (!latitude && !longitude) {
      setDisableSubmitButton(true);
      toast.loading("Looking for your position...", {
        autoClose: false,
        transition: Slide,
        hideProgressBar: false,
        closeButton: false,
        position: "bottom-center",
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        toastId: "userPositionToast",
      });
      return;
    } else {
      //check if marker already exists
      if (carMarkerRef.current) {
        map.removeLayer(carMarkerRef.current);
      }

      carMarkerRef.current = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: icons.carV2,
          iconSize: [50, 50],
          // iconSize: [25, 25],
          // iconSize: [70, 30],
          iconAnchor: [20, 6],
          popupAnchor: [0, -6],
        }),
        zIndexOffset: 1000,
        alt: "car",
        riseOnHover: true,
      });

      carMarkerRef.current.bindPopup("Hey! your are here!");
      carMarkerRef.current.on("mouseover", (e: any) => e.target.openPopup());
      carMarkerRef.current.on("mouseout", (e: any) => e.target.closePopup());
      carMarkerRef.current.on("click", () => {
        map.setView([latitude, longitude], 15);
      });

      carMarkerRef.current.addTo(map);

      map.panTo([latitude, longitude], {
        animate: true,
        duration: 1,
        easeLinearity: 0.5,
        noMoveStart: true,
      });
      toast.update("userPositionToast", {
        render: "Found your position!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        transition: Slide,
        hideProgressBar: false,
        closeButton: true,
      });
      setDisableSubmitButton(false);
    }
  };

  useEffect(() => {
    addCarMarker();
  }, [latitude, longitude]);

  return null;
};
