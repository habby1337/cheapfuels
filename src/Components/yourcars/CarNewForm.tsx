import { FuelType, RefuelingMode } from '@/Shared/Interfaces/enums';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Select from 'react-select';

import { useIndexedDBStore } from 'use-indexeddb';
import { VehicleData } from '@/Shared/Interfaces/interfaces';
import { toast } from 'react-toastify';
import AvgPriceLabel from '../AvgPriceLabel/AvgPriceLabel';

interface Props {
  onNewCarAdded: () => void;
}

const CarNewForm = ({ onNewCarAdded }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<VehicleData & FuelType>();

  const fuelTypeOptions = Object.keys(FuelType).map((key) => ({
    value: FuelType[key as keyof typeof FuelType],
    label: key as keyof typeof FuelType,
  }));

  const fuelingModeOptions = Object.keys(RefuelingMode).map((key) => ({
    value: RefuelingMode[key as keyof typeof RefuelingMode],
    label: key as keyof typeof RefuelingMode,
  }));

  const { add } = useIndexedDBStore('vehicles') as {
    add: (vehicle: VehicleData) => Promise<number>;
  };

  const onSubmit: SubmitHandler<VehicleData> = (data) => {
    const {
      carName,
      carBrand,
      carModel,
      carYear,
      desiredPrice,
      refuelingMode,
      fuelType,
    }: VehicleData = data;

    toast
      .promise(
        add({
          carName,
          carBrand,
          carModel,
          carYear,
          desiredPrice,
          refuelingMode,
          fuelType,
        }),
        {
          pending: 'Adding new vehicle...',
          success: 'Vehicle added',
          error: 'Error adding vehicle',
        },
        { toastId: 'addVehicle' }
      )
      .then((d) => {
        toast.success(`Vehicle added with id ${d}`);
        onNewCarAdded();
      })
      .catch((errors) => {
        toast.error(`Error adding vehicle ${errors as string}`);
      });
    resetForm();
  };

  const resetForm = () => {
    reset();
    reset({ fuelType: null });
  };

  const classesStyle = {
    control: () =>
      ' dark:bg-slate-800 dark:border-slate-700 rounded-xl border-slate-200',
    singleValue: () => ' dark:text-white',
    placeholder: () => ' dark:text-gray-700',
    menu: () => ' dark:bg-slate-800',
    option: () => ' hover:dark:text-gray-800',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label
          htmlFor='fuelType'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Fuel Type
        </label>
        <Controller
          control={control}
          name='fuelType'
          rules={{ required: 'Select a fuel type' }}
          defaultValue={null}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classesStyle}
              placeholder='Select fuel type'
              options={fuelTypeOptions}
            />
          )}
        />
        {errors.fuelType && (
          <span className='text-xs text-red-500'>
            {errors.fuelType.message}
          </span>
        )}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='refuelingMode'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Refueling Mode
        </label>
        <Controller
          control={control}
          name='refuelingMode'
          rules={{ required: 'Select refueling mode' }}
          defaultValue={null}
          render={({ field }) => (
            <Select
              {...field}
              classNames={classesStyle}
              placeholder='Select refueling mode'
              options={fuelingModeOptions}
            />
          )}
        />
        {errors.refuelingMode && (
          <span className='text-xs text-red-500'>
            {errors.refuelingMode.message}
          </span>
        )}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='desiredPrice'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Desired Price (± 0.20 cents)
        </label>
        <input
          type='number'
          id='desiredPrice'
          step='0.01'
          placeholder='1.80'
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800'
          {...register('desiredPrice', {
            required: 'Insert a desired price',
          })}
        />
        {errors.desiredPrice && (
          <span className='text-xs text-red-500'>
            {errors.desiredPrice.message}
          </span>
        )}
        {/* create an under label */}
        <AvgPriceLabel fuelType={watch('fuelType')} />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='carName'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Car Name
        </label>
        <input
          type='text'
          id='carName'
          placeholder='My Car'
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800'
          {...register('carName', { required: 'Add a custom name' })}
        />
        {errors.carName && (
          <span className='text-xs text-red-500'>{errors.carName.message}</span>
        )}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='carBrand'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Vehicle Brand
        </label>
        <input
          type='text'
          id='carBrand'
          placeholder='Ford'
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800'
          {...register('carBrand', {
            required: 'Insert the car brand',
          })}
        />
        {errors.carBrand && (
          <span className='text-xs text-red-500'>
            {errors.carBrand.message}
          </span>
        )}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='carModel'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Vehicle Model
        </label>
        <input
          type='text'
          id='carModel'
          placeholder='Mustang'
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800'
          {...register('carModel', {
            required: 'Insert the car model',
          })}
        />
        {errors.carModel && (
          <span className='text-xs text-red-500'>
            {errors.carModel.message}
          </span>
        )}
      </div>

      <div className='mb-4'>
        <label
          htmlFor='carYear'
          className='text-sm font-medium text-gray-700 dark:text-gray-200'>
          Vehicle Production Year
        </label>
        <input
          type='number'
          id='carYear'
          placeholder='2019'
          className='block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800'
          {...register('carYear', {
            required: 'Add the vehicle production year',
          })}
        />
        {errors.carYear && (
          <span className='text-xs text-red-500'>{errors.carYear.message}</span>
        )}
      </div>

      <div className='flex justify-end mt-6'>
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500'>
          Add
        </button>

        <button
          type='button'
          onClick={resetForm}
          className='px-4 py-2 ml-4 text-sm font-medium text-red-500 bg-transparent border border-red-500 rounded-md hover:text-white hover:bg-red-500 focus:outline-none focus:border-red-500'>
          Reset
        </button>
      </div>
    </form>
  );
};

export default CarNewForm;
