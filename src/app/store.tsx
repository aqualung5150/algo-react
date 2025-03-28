import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import menuSlice from "../layout/menuSlice";
import memberSlice from "features/member/memberSlice";
import authSlice from "features/auth/authSlice";

// redux-persist

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["member"],
};

const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    member: memberSlice.reducer,
    menu: menuSlice.reducer,
    auth: authSlice.reducer,
  }),
);

// createStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
