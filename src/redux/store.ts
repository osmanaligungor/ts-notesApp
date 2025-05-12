import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tagsReducer from "./slices/tagsSlice";
import notesReducer from "./slices/notesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// persist middleware ayarlarını yap
const persistConfig = {
  key: "root",
  storage,
};

// reducerları birleştir
const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
});

// reducer'ları persist'e tanıt
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store'u oluştur
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// useSelector'ü her kullandığımız yerde store tipini tanımlamak için kullanacağız.
export type RootState = ReturnType<typeof store.getState>;
// useDispatch'i her kullandığımız yerde store tipini tanımlamak için kullanacağız.
export type AppDispatch = typeof store.dispatch;

// persist'in ve kendi storu'umuzu export et
export const persistor = persistStore(store);
export default store;
