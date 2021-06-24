import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, REGISTER } from 'redux-persist'

import { actions as apiActions } from '../api'
import middleware from './middleware'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REGISTER, apiActions.apiRequest.type],
      },
    }).concat(middleware),
})

export { store }
