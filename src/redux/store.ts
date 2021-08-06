import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { actions as JobActions } from 'modules/Job'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, REGISTER } from 'redux-persist'

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
          ApiActions.apiRequest.type,
          ApiActions.apiError.type,
          UserActions.uploadUserPhotoSuccess.type,
          //handling unserialized values startTime & endTime
          JobActions.setTmpFormValues.type,
        ],
      },
    }).concat(middleware),
})

let persistor = persistStore(store)

export { store, persistor }
