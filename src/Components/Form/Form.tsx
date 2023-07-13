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
        label: `${vehicle.carBrand} ${vehicle.carModel} ${vehicle.carYear}`,
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
    <div className='container px-0 '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid justify-center grid-flow-row gap-4 p-4 rounded-md shadow-lg md:grid-flow-col md:flex-row dark:shadow-md justify-items-center bg-slate-200 dark:bg-slate-900'>
        {/* selettore macchina */}
        <div className='flex-row items-center justify-center'>
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
                // @ts-ignore: Unreachable code error
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
        <div className='flex-row items-center justify-center'>
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
        <div className='flex-row items-center justify-center'>
          <Controller
            control={control}
            name='priceOrder'
            rules={{ required: 'Select a price order' }}
            render={({ field }) => (
              <Select
                {...field}
                classNames={classNamesStyles}
                placeholder='Select price order'
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
        <Button disabled={isLoading}>
          <ButtonText />
        </Button>
      </form>
    </div>
  );
};

export default Form;
