import { useEffect } from 'react';
import Map from './Map';

const MapContainer = () => {
  useEffect(() => {
    console.log('expecting call to osservaprezzi');
  }, []);

  return (
    <div className='container block px-0 mt-3 border-4 h-5/6 bg-slate-200 dark:bg-slate-900 rounded-xl backdrop-blur'>
      <Map />
    </div>
  );
};

export default MapContainer;
