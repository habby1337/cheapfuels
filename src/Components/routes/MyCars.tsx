import { useEffect } from "react";
import CarNewForm from "../yourcars/CarNewForm";
import CarUpdateForm from "../yourcars/CarUpdateForm";
import CarViewCard from "../yourcars/CarViewCard";

import { useIndexedDBStore } from "use-indexeddb";
import { VehicleDataWithId } from "@/Shared/Interfaces/interfaces";

import { useState } from "react";
import { useStore } from "@/Shared/Store/store";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

const MyCars = () => {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<VehicleDataWithId[] | null>(null);
  const [isNewCar, setIsNewCar] = useState<boolean>(false);
  const setIsInterfaceLoading = useStore(
    (state) => state.setIsInterfaceLoading,
  );

  const [isNewCarAdded, setIsNewCarAdded] = useState<boolean>(false);

  const handleNewCarAdded = () => setIsNewCarAdded(!isNewCarAdded);

  useEffect(() => {
    if (id) setIsNewCar(false);
    else setIsNewCar(true);
  }, [id]);

  const { getAll } = useIndexedDBStore("vehicles") as {
    getAll: () => Promise<VehicleDataWithId[]>;
  };

  const getCarFromDB = (): void => {
    setIsInterfaceLoading(true);
    toast
      .promise(
        getAll(),
        {
          pending: "Loading...",
          success: "Car data loaded",
          error: "Error loading car data",
        },
        { toastId: "carData", autoClose: 2000 },
      )
      .then((data) => {
        if (!data.length || data.length === 0)
          return toast.info("Hey, looks like you have no cars yet, add one!", {
            toastId: "noCars",
            position: "top-center",
            autoClose: 7000,
          });
        setCarData(data);
      })
      .catch((error) => {
        toast.error(`Error loading car data ${error as string}`);
      })
      .finally(() => {
        setIsInterfaceLoading(false);
      });
  };

  useEffect(() => {
    getCarFromDB();
  }, [isNewCarAdded]);

  return (
    <div className="container px-0">
      <div className="flex-row gap-x-2 lg:flex">
        <div className="w-full lg:w-1/3">
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 ">
            <CarViewCard carData={carData} isNewCarAdded />
          </div>
        </div>

        <div className="flex-grow mt-5 lg:mt-0 w-100">
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
            {isNewCar ? (
              <CarNewForm onNewCarAdded={handleNewCarAdded} />
            ) : (
              <CarUpdateForm onNewCarAdded={handleNewCarAdded} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCars;
