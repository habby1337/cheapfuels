import { useEffect } from 'react';
import Map from './Map';
import { FuelsApiClient } from 'osservaprezzi-carburanti-node';
import { SearchByZoneCriteria } from '@/Shared/Interfaces/interfaces';
import { FuelType, RefuelingMode } from '@/Shared/Interfaces/enums';

const MapContainer = () => {
  const client = new FuelsApiClient();

  useEffect(() => {
    const searchCriteria: SearchByZoneCriteria = {
      points: [
        { lat: 42.32843626674558, lng: 12.188716303785915 },
        { lat: 42.389322963743865, lng: 12.37136400886404 },
        { lat: 42.31726730642802, lng: 12.44277514167654 },
      ],
      fuelType: FuelType.ALL,
      refuelingMode: RefuelingMode.ALL,
      priceOrder: 'asc',
    };

    const searchResponse = client.search.byZone(searchCriteria);

    searchResponse
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='container block px-0 mt-3 border-4 h-5/6 bg-slate-200 dark:bg-slate-900 rounded-xl backdrop-blur'>
      <Map />
    </div>
  );
};

export default MapContainer;
