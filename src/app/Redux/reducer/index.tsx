'use client';

import { combineReducers } from "redux";
// import storageSession from "redux-persist/lib/storage/session";
// import { persistReducer } from "redux-persist";

import {userReducer} from "./user";
// import app from "./app";

// const persistConfig = {
//   key: "root",
//   storage: storageSession,
//   timeout: 500,
// };

// const reducers = persistReducer(persistConfig, combineReducers({ user, app }));
const reducers = combineReducers({ userReducer });

export default reducers;
