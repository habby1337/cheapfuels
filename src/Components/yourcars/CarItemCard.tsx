import { MouseEventHandler } from 'react';

const CarItemCard = (props: any) => {
  const handleItemCarClick = () => {
    console.log('clicked');
  };
  return (
    <div
      onClick={handleItemCarClick}
      className='block mt-1 bg-white border border-gray-300 rounded-lg shadow hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-slate-700 hover:cursor-pointer'>
      <div className='flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-800'>
        <div className='flex items-center flex-1'>
          <div className='relative hidden w-8 h-8 mr-3 rounded-full md:block'>
            <img
              className='object-fill w-full h-full rounded-full'
              src='https://source.boringavatars.com/marble/120/Maria%20Mitchell?colors=27191c,2d3839,114d4d,6e9987,e0e4ce'
              alt=''
              loading='lazy'
            />
            <div
              className='absolute inset-0 rounded-full shadow-inner'
              aria-hidden='true'></div>
          </div>
          <div>
            <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>
              Chicco machine
            </p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              2019 Ford Mustang
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between py-2 pl-4 pr-2 bg-indigo-50 dark:bg-gray-800'>
          <span className='pr-1 text-xs font-semibold text-gray-600 uppercase dark:text-gray-400'>
            Alim.
          </span>
          <span className='text-xs font-semibold text-gray-900 dark:text-gray-200'>
            Benzina
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarItemCard;
