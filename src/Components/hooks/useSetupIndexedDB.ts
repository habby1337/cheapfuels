import { useEffect } from 'react';
import setupIndexedDB from 'use-indexeddb';

import idbConfig from '../../DBConf/config';

const useSetupIndexedDB = () => {
  useEffect(() => {
    setupIndexedDB(idbConfig)
      .then(() => console.log('IndexedDB setup complete!')) //todo Add react toast
      .catch((err) => console.error('Failed to setup IndexedDB', err)); //todo Add react toast
  }, []);
};

export default useSetupIndexedDB;
