const idbConfig = {
  databaseName: 'cheapfuels',
  version: 1,
  stores: [
    {
      name: 'vehicles',
      id: { keyPath: 'id', autoIncrement: true },
      indices: [
        { name: 'carName', keyPath: 'carName', options: { unique: true } },
        { name: 'carModel', keyPath: 'carModel', options: { unique: false } },
        { name: 'carBrand', keyPath: 'carBrand', options: { unique: false } },
        { name: 'carYear', keyPath: 'carYear', options: { unique: false } },
        {
          name: 'carFuelType',
          keyPath: 'carFuelType',
          options: { unique: false },
        },
        {
          name: 'carDesiredPrice',
          keyPath: 'carDesiredPrice',
          options: { unique: false },
        },
      ],
    },
  ],
};

export default idbConfig;
