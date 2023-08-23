import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import userReducer from './slice/userSlice';
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';
import articlesSlice from "../features/articles/articlesSlice";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'properties']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        properties: propertiesSlice,
        filter: filterSlice,
        agent: agentSlice,
        user: userReducer,
        articles: articlesSlice,
        persistedReducer,
    },
   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
export const persistor = persistStore(store);
