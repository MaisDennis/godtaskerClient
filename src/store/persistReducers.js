import storage from 'redux-persist/lib/storage'
import {persistReducer } from 'redux-persist';
export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gerenteDash',
      storage,
      whitelist: ['auth', 'image', 'user'],
    },
    reducers
  );
  return persistedReducer;
}
