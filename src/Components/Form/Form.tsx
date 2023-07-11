import Select from 'react-select';
import { Button } from '@/Components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormInputs } from '@/Shared/Interfaces/interfaces';

const From = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
      return <>Submit</>;
    }
  };

  const { control } = useForm();

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); // Aggiungi questa riga se desideri impedire il comportamento di sottomissione predefinito del modulo
    const formData = new FormData(event.currentTarget);
    const data: FormInputs = {
      vehicleId: formData.get('vehicleId') as string,
      distance: formData.get('distance') as string,
      priceOrder: formData.get('priceOrder') as 'asc' | 'desc',
    };
    console.log(data);
  };

  return (
    <div className='container px-0 mt-5'>
      <form
        onSubmit={handleFormSubmit}
        className='grid justify-center grid-flow-row gap-4 p-4 rounded-md shadow-lg md:grid-flow-col md:flex-row dark:shadow-md justify-items-center bg-slate-200 dark:bg-slate-900'>
        {/* selettore macchina */}
        <Controller
          control={control}
          name='vehicleId'
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder='Seleziona il veicolo'
              isDisabled={isLoading}
            />
          )}
        />
        {/* selettore ordine  */}
        <Controller
          control={control}
          name='distance'
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder="Seleziona l'ordine "
              isDisabled={isLoading}
            />
          )}
        />
        {/* selettore distanza */}
        <Controller
          control={control}
          name='priceOrder'
          render={({ field }) => (
            <Select
              {...field}
              classNames={classNamesStyles}
              placeholder="Seleziona l'ordine "
              isDisabled={isLoading}
            />
          )}
        />
        {/* bottone submit */}
        <Button disabled={isLoading}>
          <ButtonText />
        </Button>
      </form>
    </div>
  );
};

export default From;
