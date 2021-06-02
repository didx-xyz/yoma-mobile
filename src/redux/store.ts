import { configureStore } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import middleware from "./middleware";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REGISTER],
      },
    }).concat(middleware),
});

let persistor = persistStore(store);

export { store, persistor };
