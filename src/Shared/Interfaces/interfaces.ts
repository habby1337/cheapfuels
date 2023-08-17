import { LogoMarker, ServiceArea } from 'osservaprezzi-carburanti-node';
import { FuelType, RefuelingMode } from './enums';

export interface MapPoint {
  lat: number;
  lng: number;
}

export interface SearchBaseCriteria {
  fuelType?: FuelType;
  refuelingMode?: RefuelingMode;
  priceOrder?: 'asc' | 'desc';
}

export interface SearchByZoneCriteria extends SearchBaseCriteria {
  points: MapPoint[];
}

export interface SearchByGeographicAreaCriteria extends SearchBaseCriteria {
  province?: string;
  region: number;
  town?: string;
}

export interface SearchByBrandCriteria extends SearchBaseCriteria {
  province?: string;
  region?: number;
  brand?: string;
  queryText?: string;
}

// Form interfaces
export interface FormInputs {
  vehicleId: string | null;
  distance: string | null;
  priceOrder: { label: string; value: string } | null;
}

export interface VehicleData {
  fuelType?: { label: string; value: string } | null; // Assuming FuelType is an enum type
  refuelingMode?: { label: string; value: string } | null; // Assuming RefuelingMode is an enum type
  desiredPrice?: number;
  carName: string;
  carBrand: string;
  carModel: string;
  carYear: number;
}

export interface VehicleDataWithId extends VehicleData {
  id: number;
}

export interface VehicleDataSelectList {
  readonly label: string;
  readonly value: string;
  readonly isDisabled?: boolean;
}

export interface FuelStation {
  bandiera: string;
  brand: string;
  logoMarkerList: LogoMarker[];
  location: {
    lat: number;
    lng: number;
  };
}

export interface customServiceAreaSearchResponse {
  results: FuelStation[];
  success: boolean;
}

export type FuelData = {
  avg: string;
  accisa: string;
  iva: string;
  netto: string;
  variation_amount: string;
  variation_percentage: string;
};

export interface AvgPrice {
  date: string;
  petrol: FuelData;
  diesel: FuelData;
  gpl: FuelData;
}

export interface FuelStationObj {
  fuelStation: ServiceArea;
}
