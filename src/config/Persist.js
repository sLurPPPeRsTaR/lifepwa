import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';

const PERSIST = {
  active: true,
  reducerVersion: '2.0',
  storeConfig: {
    key: 'rootnew',
    storage,
    whitelist: ['auth', 'persistant', 'persist'],
  },
};

export default PERSIST;
