import Select from "react-select";
import Creatable from "react-select/creatable";

import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import {
  FormInputs,
  VehicleDataSelectList,
  VehicleDataWithId,
  SearchByZoneCriteria,
  SelectOption,
} from "@/Shared/Interfaces/interfaces";

import { FuelType, RefuelingMode } from "@/Shared/Interfaces/enums";

import { useIndexedDBStore } from "use-indexeddb";
import { toast } from "react-toastify";
import { usePosition } from "../hooks/usePosition";
import { getCircleFromPoint } from "@/Shared/Services/getCircleFromPoint";

import { useStore } from "@/Shared/Store/store";

const Form = () => {
  const setFuelStations = useStore((state) => state.setFuelStations);
  const setBrandList = useStore((state) => state.setBrandList);
  const [isLoading, setIsLoading] = useStore((state) => [
    state.isLoading,
    state.setIsLoading,
  ]);
  const [isInterfaceLoading, setIsInterfaceLoading] = useStore((state) => [
    state.isInterfaceLoading,
    state.setIsInterfaceLoading,
  ]);
  const disableSubmitButton = useStore((state) => state.disableSubmitButton);
  const { latitude: lat, longitude: lng, error: coordErr } = usePosition();
  const [isLoadingCar, setIsLoadingCar] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleDataSelectList[]>([]);
  const { getAll, getByID } = useIndexedDBStore("vehicles") as {
    getAll: () => Promise<VehicleDataWithId[]>;
    getByID: (id: number) => Promise<VehicleDataWithId>;
  };

  const populateVehiclesList = (data: VehicleDataWithId[]) => {
    if (!data) {
      toast.error("No vehicles found");
      return;
    }

    const vehiclesList: VehicleDataSelectList[] = data.map((vehicle) => {
      return {
        value: String(vehicle.id),
        label: `${vehicle.carName} (${vehicle.carBrand} ${vehicle.carModel})`,
      };
    });

    setVehicles(vehiclesList);

    return;
  };

  useEffect(() => {
    setIsLoadingCar(true);
    getAll()
      .then((data) => populateVehiclesList(data))
      .catch((err) => toast.error(`Error getting vehicles ${err as string}`));

    setTimeout(() => {
      setIsLoadingCar(false);
      setIsInterfaceLoading(false);
    }, 1000);
  }, []);

  const classNamesStyles = {
    container: () =>
      isInterfaceLoading
        ? " bg-gray-300 text-gray-500 cursor-not-allowed animate-pulse rounded-md "
        : "",
    control: () =>
      " bg-slate-900 dark:bg-slate-800 dark:border-slate-700 rounded-xl border-slate-200",
    singleValue: () => "dark:text-white",
    menu: () => "bg-slate-900 dark:bg-slate-800",
    option: () =>
      "dark:text-white dark:bg-slate-800  dark:hover:text-slate-600 dark:hover:bg-slate-200 dark:selected:bg-slate-300 dark:selected:text-slate-600",
    input: () => "dark:text-white ",
    valueContainer: () => "dark:text-white ",
  };

  const ButtonText = () => {
    if (isLoadingCar || isInterfaceLoading) {
      return (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Please wait
        </>
      );
    } else {
      return <>Submit</>;
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsLoading(true);
    if (coordErr) {
      toast.error("Error getting coordinates");
      return;
    }

    const searchPoints = getCircleFromPoint(
      lat,
      lng,
      Number(data.distance?.value) * 1000,
      50,
    );

    const vehicleId = Number(data.vehicleId?.value);
    getByID(vehicleId)
      .then((vehicle) => {
        const searchCriteria: SearchByZoneCriteria = {
          points: searchPoints,
          fuelType: vehicle.fuelType?.value as FuelType,
          refuelingMode: vehicle.refuelingMode?.value as RefuelingMode,
          priceOrder: data.priceOrder?.value as "asc" | "desc" | undefined,
        };

        const fuelStationsResponse = axios.post(
          "/api/searchByZone",
          searchCriteria,
        );
        const brandListResponse = axios.get("/api/brandList");

        Promise.all([fuelStationsResponse, brandListResponse])
          .then((res) => {
            const fuelStations = res[0].data;
            const brandList = res[1].data;
            if (fuelStations.success === false || !fuelStations)
              toast.error("Errore nel caricamento delle stazioni di servizio");

            if (brandList.success === false || !brandList)
              toast.error("Errore nel caricamento delle marche");

            setFuelStations(fuelStations);
            setBrandList(brandList);
            console.log(fuelStations, "fuelStations", brandList, "brandList");
          })
          .catch((err) => {
            toast.error(`Error getting fuel stations: ${err as string}`);
          })
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => toast.error(`Error getting vehicle ${err as string}`));
  };

  const handleNewDistance = (value: string) => {
    const numericValue = parseFloat(value.replace(",", "."));
    if (!isNaN(numericValue)) {
      const distance = numericValue * 1000;
      const distanceOption = {
        value: String(distance),
        label: `${value} km`,
      };
      return distanceOption;
    }
    return null; // Return null if the input is not a valid number
  };

  const [distanceOptionsList, setDistanceOptionsList] = useState([]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid w-full grid-cols-12 gap-2 p-4 px-4 py-5 rounded-md shadow-lg bg-slate-200 md:grid-cols-12 sm:p-6 md:justify-center md:grid-flow-col md:flex-row dark:shadow-md dark:bg-slate-900"
    >
      {/* selettore macchina */}
      <div className="w-full col-span-4 md:items-center md:justify-center">
        <Controller
          control={control}
          name="vehicleId"
          rules={{ required: "Select a vehicle" }}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder={
                isInterfaceLoading
                  ? // <span className='inline-block w-1/2 h-5 bg-gray-300 animate-pulse '></span>
                    "Please wait"
                  : "Select vehicle"
              }
              isDisabled={isLoadingCar || isLoading || isInterfaceLoading}
              options={vehicles}
            />
          )}
        />
        {/* error message space */}
        {errors.vehicleId && (
          <span className="text-xs text-red-500">
            {errors.vehicleId.message}
          </span>
        )}
      </div>
      {/* selettore ordine  */}
      <div className="w-full col-span-4 md:items-center md:justify-center">
        <Controller
          control={control}
          name="distance"
          rules={{ required: "Select a distance" }}
          render={({ field }) => (
            // <Select
            //   {...field}
            //   classNames={classNamesStyles}
            //   placeholder={
            //     isInterfaceLoading ? 'Please wait' : 'Select distance'
            //   }
            //   isDisabled={isLoadingCar || isLoading || isInterfaceLoading}
            //   options={[
            //     { value: '1', label: '1 km' },
            //     { value: '5', label: '5 km' },
            //     { value: '10', label: '10 km' },
            //     { value: '25', label: '25 km' },
            //     { value: '50', label: '50 km' },
            //     { value: '100', label: '100 km' },
            //   ]}
            // />
            <Creatable
              {...field}
              classNames={classNamesStyles}
              placeholder={
                isInterfaceLoading ? "Please wait" : "Select distance"
              }
              isDisabled={isLoadingCar || isLoading || isInterfaceLoading}
              options={[
                {
                  label: "Custom",
                  options: distanceOptionsList,
                },
                {
                  label: "Standard",
                  options: [
                    { value: "1", label: "1 km" },
                    { value: "5", label: "5 km" },
                    { value: "10", label: "10 km" },
                    { value: "25", label: "25 km" },
                    { value: "50", label: "50 km" },
                    { value: "100", label: "100 km" },
                  ],
                },
              ]}
              formatCreateLabel={(inputValue) => `Create "${inputValue}" km`}
              getNewOptionData={(inputValue) => handleNewDistance(inputValue)}
              onCreateOption={(inputValue) => {
                const newOption = handleNewDistance(inputValue);
                if (newOption) {
                  const existingValues = distanceOptionsList.map(
                    (option: SelectOption) => option.value,
                  );
                  if (!existingValues.includes(newOption.value)) {
                    const newOptionsList = [...distanceOptionsList, newOption];
                    setDistanceOptionsList(newOptionsList as any);
                  }

                  console.log("New option:", newOption);
                }
              }}
            />
          )}
        />
        {errors.distance && (
          <span className="text-xs text-red-500">
            {errors.distance.message}
          </span>
        )}
      </div>
      {/* selettore distanza */}
      <div className="w-full col-span-4 md:items-center md:justify-center">
        <Controller
          control={control}
          name="priceOrder"
          rules={{ required: "Price order" }}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder={isInterfaceLoading ? "Please wait" : "Price order"}
              isDisabled={isLoadingCar || isLoading || isInterfaceLoading}
              options={[
                { value: "asc", label: "Crescente" },
                { value: "desc", label: "Decrescente" },
              ]}
            />
          )}
        />
        {errors.priceOrder && (
          <span className="text-xs text-red-500">
            {errors.priceOrder.message}
          </span>
        )}
      </div>
      {/* bottone submit */}
      <Button
        disabled={
          isLoadingCar || isLoading || isInterfaceLoading || disableSubmitButton
        }
        className="w-full col-span-12 md:col-span-3"
      >
        <ButtonText />
      </Button>
    </form>
  );
};

export default Form;
