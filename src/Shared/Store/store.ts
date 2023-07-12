import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SelectedCarStore {
  selectedVehicleId: number;
  setSelectedVehicleId: (selectVehicleId: number) => void;
}

export const useStore = create<SelectedCarStore>()(
  devtools((set) => ({
    selectedVehicleId: 0,
    setSelectedVehicleId: (selectedVehicleId: number) =>
      set({ selectedVehicleId }),
  }))
);
