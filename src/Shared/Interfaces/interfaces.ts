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
  vehicleId: string;
  distance: string;
  priceOrder: 'asc' | 'desc';
}
