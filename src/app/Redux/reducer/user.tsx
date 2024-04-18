'use client';

import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  userDetails: {},
  token: "",
  loggedIn: false,
  count:0
};

// ==============================|| SLICE - MENU ||============================== //

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser : (state, action) => {
      state.userDetails = action.payload.userDetails;
      state.token = action.payload.token;
      state.loggedIn = true;
      console.log("state.count",state.count);
      console.log("state.loggedIn",state.loggedIn);
      console.log("state.userDetails",state.userDetails);
      console.log("gsgsgg",state.token);
    
    },
    logoutUser:(state, action) => {
      state.userDetails = initialState.userDetails;
      state.token = initialState.token;
      state.loggedIn = initialState.loggedIn;
    },
    hello:(state) =>{
        state.count +=1;
       
    }
  },
});



export const { loginUser, logoutUser,hello } = user.actions;
export const userReducer = user.reducer;