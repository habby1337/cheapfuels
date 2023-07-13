// @ts-nocheck
import Select from 'react-select';
import { Button } from '@/Components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  FormInputs,
  VehicleDataSelectList,
  VehicleDataWithId,
} from '@/Shared/Interfaces/interfaces';

import { useIndexedDBStore } from 'use-indexeddb';
import { toast } from 'react-toastify';

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<VehicleDataSelectList[]>([]);
  const { getAll } = useIndexedDBStore('vehicles') as {
    getAll: () => Promise<VehicleDataWithId[]>;
  };

  useEffect(() => {
    setIsLoading(true);
    getAll()
      .then((data) => populateVehiclesList(data))
      .catch((err) => toast.error(`Error getting vehicles ${err as string}`));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const populateVehiclesList = (data: VehicleDataWithId[]) => {
    if (!data) {
      toast.error('No vehicles found');
      return;
    }

    const vehiclesList: VehicleDataSelectList[] = data.map((vehicle) => {
      return {
        value: String(vehicle.id),
        label: `${vehicle.carName} (${vehicle.carBrand} ${vehicle.carModel})`,
      };
    });

    setVehicles(vehiclesList);

    toast.success('Vehicles loaded');

    return;
  };

  const classNamesStyles = {
    control: () =>
      ' bg-slate-900 dark:bg-slate-800 dark:border-slate-700 rounded-xl border-slate-200',
    singleValue: () => 'dark:text-white',
    menu: () => 'bg-slate-900 dark:bg-slate-800',
    option: () =>
      'dark:text-white dark:bg-slate-800  dark:hover:text-slate-600 dark:hover:bg-slate-200 dark:selected:bg-slate-300 dark:selected:text-slate-600',
    input: () => 'dark:text-white',
    valueContainer: () => 'dark:text-white',
  };

  const ButtonText = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className='w-4 h-4 mr-2 animate-spin' />
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
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid w-full grid-cols-12 gap-2 p-4 px-4 py-5 rounded-md shadow-lg md:grid-cols-12 sm:p-6 md:justify-center md:grid-flow-col md:flex-row dark:shadow-md bg-slate-200 dark:bg-slate-900'>
      {/* selettore macchina */}
      <div className='w-full col-span-4 md:items-center md:justify-center'>
        <Controller
          control={control}
          name='vehicleId'
          rules={{ required: 'Select a vehicle' }}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder='Select vehicle'
              isDisabled={isLoading}
              options={vehicles}
            />
          )}
        />
        {/* error message space */}
        {errors.vehicleId && (
          <span className='text-xs text-red-500'>
            {errors.vehicleId.message}
          </span>
        )}
      </div>
      {/* selettore ordine  */}
      <div className='w-full col-span-4 md:items-center md:justify-center'>
        <Controller
          control={control}
          name='distance'
          rules={{ required: 'Select a distance' }}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder='Select distance '
              isDisabled={isLoading}
              options={[
                { value: '1', label: '1 km' },
                { value: '5', label: '5 km' },
                { value: '10', label: '10 km' },
                { value: '25', label: '25 km' },
                { value: '50', label: '50 km' },
                { value: '100', label: '100 km' },
              ]}
            />
          )}
        />
        {errors.distance && (
          <span className='text-xs text-red-500'>
            {errors.distance.message}
          </span>
        )}
      </div>
      {/* selettore distanza */}
      <div className='w-full col-span-4 md:items-center md:justify-center'>
        <Controller
          control={control}
          name='priceOrder'
          rules={{ required: 'Price order' }}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder='Price order'
              isDisabled={isLoading}
              options={[
                { value: 'asc', label: 'Crescente' },
                { value: 'desc', label: 'Decrescente' },
              ]}
            />
          )}
        />
        {errors.priceOrder && (
          <span className='text-xs text-red-500'>
            {errors.priceOrder.message}
          </span>
        )}
      </div>
      {/* bottone submit */}
      <Button
        disabled={isLoading}
        className='w-full col-span-12 md:col-span-3'>
        <ButtonText />
      </Button>
    </form>
  );
};

export default Form;
