import { configureStore } from "@reduxjs/toolkit";


import CheckUserRepoReducer from "./features/CheckUserRepoSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  CheckRepoType from "./types/CheckRepoType";

export interface StoreType {
  checkRepo: CheckRepoType;
}

const store = configureStore<StoreType>({
  reducer: {
    checkRepo: CheckUserRepoReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;

export default store;