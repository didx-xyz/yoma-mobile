import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import { actions as ApiActions } from '../api'
import { actions as UserActions } from '../modules/User'
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
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          REGISTER,
          REHYDRATE,
          ApiActions.apiRequest.type,
          ApiActions.apiError.type,
          UserActions.uploadUserPhotoSuccess.type,
        ],
      },
    }).concat(middleware),
})

let persistor = persistStore(store)

export { store, persistor }
