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
  desiredPrice?: number;
  carName: string;
  carBrand: string;
  carModel: string;
  carYear: number;
}

export interface VehicleDataWithId extends VehicleData {
  id: number;
}
