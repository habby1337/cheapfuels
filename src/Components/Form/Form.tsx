import Select from 'react-select';
import { Button } from '@/Components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const From = () => {
  const [isLoading, setIsLoading] = useState(false);

  const classNamesStyles = {
    control: () =>
      ' bg-slate-900 dark:bg-slate-800 dark:border-slate-900 rounded-xl border-slate-200',
    singleValue: () => 'text-white',
    placeholder: () => 'text-white',
    menu: () => 'bg-slate-900 dark:bg-slate-800',
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
      return 'Submit';
    }
  };

  return (
    <div className='container px-0 mt-5'>
      <div className='grid justify-center grid-flow-row gap-4 p-4 rounded-md shadow-lg md:grid-flow-col md:flex-row dark:shadow-md justify-items-center bg-slate-200 dark:bg-slate-900'>
        {/* selettore macchina */}
        <Select
          classNames={classNamesStyles}
          placeholder='Seleziona il veicolo'
          isDisabled={isLoading}
        />
        {/* selettore ordine  */}
        <Select
          classNames={classNamesStyles}
          placeholder='Seleziona la distanza'
          isDisabled={isLoading}
        />
        {/* selettore distanza */}
        <Select
          classNames={classNamesStyles}
          placeholder="Seleziona l'ordine "
          isDisabled={isLoading}
        />
        {/* bottone submit */}
        <Button disabled>
          <ButtonText />
        </Button>
      </div>
    </div>
  );
};

export default From;
