import { configureStore } from '@reduxjs/toolkit'

import middleware from './middleware'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
})

export { store }
