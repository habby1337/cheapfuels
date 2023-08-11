import { useAvgPrice } from '../hooks/useAvgPrice';
import { useEffect, useState } from 'react';
import { useStore } from '@/Shared/Store/store';

const AvgPriceLabel = (fuelType: any) => {
  const { avgPrice } = useAvgPrice();
  const [fuel, setFuel] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const isInterfaceLoading = useStore((state) => state.isInterfaceLoading);

  useEffect(() => {
    if (fuelType.fuelType) {
      const { label } = fuelType.fuelType;
      setFuel(label.toLowerCase());

      // @ts-ignore
      if (avgPrice[label.toLowerCase()]) {
        // @ts-ignore
        const avgObj = avgPrice[label.toLowerCase()];
        const sub =
          parseFloat(
            avgObj.variation_amount.replace('+', '').replace('-', '')
          ) / 1000;
        const min = parseFloat(avgObj.avg) - sub;
        // @ts-ignore
        setMinPrice(min.toFixed(2));
      }
    }
    // }
  }, [fuelType]);

  return (
    <div className='flex items-center justify-between px-1 mt-2'>
      {isInterfaceLoading ? (
        <span className='w-20 h-3 bg-gray-300 rounded-sm animate-pulse'></span>
      ) : (
        <span className='text-xs text-gray-600 dark:text-gray-400 '>
          Avg:{' '}
          {
            // @ts-ignore
            avgPrice[fuel]
              ? // @ts-ignore
                `${parseFloat(avgPrice[fuel]?.avg).toFixed(2)} €`
              : `Select fuel type`
          }
        </span>
      )}
      {isInterfaceLoading ? (
        <span className='w-20 h-3 bg-gray-300 rounded-sm animate-pulse'></span>
      ) : (
        <span className='text-xs text-gray-600 dark:text-gray-400'>
          Min:{' '}
          {
            // @ts-ignore
            avgPrice[fuel]
              ? // @ts-ignore
                `${minPrice} €`
              : `Select fuel type`
          }
        </span>
      )}
    </div>
  );
};

export default AvgPriceLabel;
