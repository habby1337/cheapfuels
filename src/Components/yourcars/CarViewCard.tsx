import { VehicleDataWithId } from '@/Shared/Interfaces/interfaces';
import CarItemCard from '../yourcars/CarItemCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '@/Shared/Store/store';

interface Props {
  carData: VehicleDataWithId[] | null;
  isNewCarAdded: boolean;
}

const CarViewCard = ({ carData, isNewCarAdded }: Props) => {
  const navigate = useNavigate();
  const isInterfaceLoading = useStore((state) => state.isInterfaceLoading);

  useEffect(() => {
    if (isNewCarAdded) console.log('new car added');
  }, [isNewCarAdded]);

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-xl font-bold text-gray-600 text-md dark:text-gray-400'>
          {isInterfaceLoading ? (
            <span className='animate-pulse'>Loading your cars...</span>
          ) : (
            'Your Cars'
          )}
        </span>
        <span className='visible text-sm text-gray-600 md:hidden dark:text-gray-400'>
          (click on a car to view its details)
        </span>
      </div>
      <div className='flex items-center justify-center mt-4'>
        <hr className='w-full h-px my-1 bg-gray-200 border-0 dark:bg-gray-700' />
      </div>
      <div className='items-center'>
        {carData?.map((car) => (
          <CarItemCard
            {...car}
            key={car.id}
          />
        ))}
      </div>
      {/* add a button to add new car */}
      {isInterfaceLoading ? (
        <div className='flex items-center justify-center w-full h-12 mt-4'>
          <button
            className='items-center self-center justify-center w-full h-full text-white bg-indigo-300 rounded-md cursor-not-allowed animate-pulse'
            type='button'
            disabled>
            <svg
              className='w-4 h-4 mx-auto text-center snap-center animate-spin '
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'></path>
            </svg>
          </button>
        </div>
      ) : (
        <div className='flex items-center justify-center w-full h-12 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700'>
          <button
            className='w-full h-1/2'
            type='button'
            onClick={() => navigate('/myCars')}>
            Add a new car
          </button>
        </div>
      )}
    </>
  );
};

export default CarViewCard;
