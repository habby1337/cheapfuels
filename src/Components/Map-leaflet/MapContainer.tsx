import Map from './Map';

import { useStore } from '@/Shared/Store/store';

const MapContainer = () => {
  const isLoading = useStore((state) => state.isLoading);
  const isInterfaceLoading = useStore((state) => state.isInterfaceLoading);

  return (
    <div className='container block px-0 mt-3 bg-gray-300 border-4 h-5/6 dark:bg-slate-900 rounded-xl backdrop-blur place-items-center'>
      {isLoading || isInterfaceLoading ? (
        <div className='flex flex-col items-center justify-center h-full transition duration-500 ease-in-out'>
          {/* <div className='w-20 h-20 mb-5 border-b-2 border-gray-900 rounded-full animate-spin'></div> */}
          <svg
            className='w-32 h-32 '
            version='1.1'
            id='L4'
            x='0px'
            y='0px'
            viewBox='0 0 100 100'
            enableBackground='new 0 0 0 0'>
            <circle
              className='fill-current'
              fill='#fff'
              stroke='none'
              cx='25%'
              cy='50'
              r='6'>
              <animate
                attributeName='opacity'
                dur='1s'
                values='0;1;0'
                repeatCount='indefinite'
                begin='0.1'
              />
            </circle>
            <circle
              className='fill-current'
              fill='#fff'
              stroke='none'
              cx='50%'
              cy='50'
              r='6'>
              <animate
                attributeName='opacity'
                dur='1s'
                values='0;1;0'
                repeatCount='indefinite'
                begin='0.2'
              />
            </circle>
            <circle
              className='fill-current'
              fill='#fff'
              stroke='none'
              cx='75%'
              cy='50'
              r='6'>
              <animate
                attributeName='opacity'
                dur='1s'
                values='0;1;0'
                repeatCount='indefinite'
                begin='0.3'
              />
            </circle>
          </svg>
        </div>
      ) : (
        <Map />
      )}
    </div>
  );
};

export default MapContainer;
