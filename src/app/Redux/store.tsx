'use client';

import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducer/index";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({ reducer: {reducers} });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;