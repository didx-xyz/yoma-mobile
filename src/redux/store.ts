import { configureStore } from '@reduxjs/toolkit'

import { actions as apiActions } from '../api'
import middleware from './middleware'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [apiActions.apiRequest.type],
      },
    }).concat(middleware),
})

export { store }
