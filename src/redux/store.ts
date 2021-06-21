import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { actions as apiActions } from '../api'
import middleware from './middleware'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [apiActions.apiRequest.type],
      },
    }).concat(middleware),
})

let persistor = persistStore(store)

export { store, persistor }
