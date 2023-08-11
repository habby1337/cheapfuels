import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SelectedCarStore {
  selectedVehicleId: number;
  setSelectedVehicleId: (selectVehicleId: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fuelStations: {};
  setFuelStations: (fuelStation: any) => void;
  brandList: [];
  setBrandList: (brandList: any) => void;
  isInterfaceLoading: boolean;
  setIsInterfaceLoading: (isInterfaceLoading: boolean) => void;
}

export const useStore = create<SelectedCarStore>()(
  devtools((set) => ({
    selectedVehicleId: 0,
    setSelectedVehicleId: (selectedVehicleId: number) =>
      set({ selectedVehicleId }),

    isLoading: false, //Todo set to false
    setIsLoading: (isLoading: boolean) => set({ isLoading }),

    fuelStations: {},
    setFuelStations: (fuelStations: any) => set({ fuelStations }),

    brandList: [],
    setBrandList: (brandList: any) => set({ brandList }),

    isInterfaceLoading: true,
    setIsInterfaceLoading: (isInterfaceLoading: boolean) =>
      set({ isInterfaceLoading }),
  }))
);
