import { VehicleDataWithId } from '@/Shared/Interfaces/interfaces';
import CarItemCard from '../yourcars/CarItemCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface Props {
  carData: VehicleDataWithId[] | null;
  isNewCarAdded: boolean;
}

const CarViewCard = ({ carData, isNewCarAdded }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isNewCarAdded) console.log('new car added');
  }, [isNewCarAdded]);

  return (
    <>
      <div className='flex items-center justify-center'>
        <span className='text-xl font-bold text-gray-600 text-md dark:text-gray-400'>
          Your Cars
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
      <div className='flex items-center justify-center w-full h-12 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md cursor-pointer hover:bg-indigo-700'>
        <button
          className='w-full h-1/2'
          type='button'
          onClick={() => navigate('/myCars')}>
          Add a new car
        </button>
      </div>
    </>
  );
};

export default CarViewCard;
