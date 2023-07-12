import { useEffect } from 'react';
import CarNewForm from '../yourcars/CarNewForm';
import CarUpdateForm from '../yourcars/CarUpdateForm';
import CarViewCard from '../yourcars/CarViewCard';

import { useIndexedDBStore } from 'use-indexeddb';
import { VehicleDataWithId } from '@/Shared/Interfaces/interfaces';

import { useState } from 'react';

import { useParams } from 'react-router-dom';

const MyCars = () => {
  const { id } = useParams<{ id: string }>();
  const [carData, setCarData] = useState<VehicleDataWithId[] | null>(null);
  const [isNewCar, setIsNewCar] = useState<boolean>(false);

  const [isNewCarAdded, setIsNewCarAdded] = useState<boolean>(false);

  const handleNewCarAdded = () => setIsNewCarAdded(!isNewCarAdded);

  useEffect(() => {
    if (id) setIsNewCar(false);
    else setIsNewCar(true);
  }, [id]);

  const { getAll } = useIndexedDBStore('vehicles') as {
    getAll: () => Promise<VehicleDataWithId[]>;
  };

  const getCarFromDB = (): void => {
    getAll()
      .then((data) => {
        console.log(data); //TODO add toast
        setCarData(data);
      })
      .catch((error) => {
        console.log(error); //TODO add toast
      });
  };

  useEffect(() => {
    getCarFromDB();
  }, [isNewCarAdded]);

  return (
    <div className='container px-0'>
      <div className='flex-row gap-x-2 lg:flex'>
        <div className='w-full lg:w-1/3'>
          <div className='block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            <CarViewCard
              carData={carData}
              isNewCarAdded
            />
          </div>
        </div>

        <div className='flex-grow mt-5 lg:mt-0 w-100'>
          <div className='block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
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
