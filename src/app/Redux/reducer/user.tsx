'use client';

import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  userDetails: {
    _id:"",
    utype:'',
    notifications:[{ 
      message:"",
      ntype:"",
      createdAt: Date,
      ProjectId:{
        projectName:"",
        _id:""
      },
      _id:""
    }   ]
  
  },
  token: "",
  loggedIn: false
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
      console.log("state.loggedIn",state.loggedIn);
      console.log("state.userDetails",state.userDetails);
      console.log("token",state.token);
    
    },
    logoutUser:(state, action) => {
      state.userDetails = initialState.userDetails;
      state.token = initialState.token;
      state.loggedIn = initialState.loggedIn;
    },
    UpdateUser:(state, action) => {
      state.userDetails = action.payload.userDetails;
      console.log("new Details",state.userDetails)
    
    }
  },
});



export const { loginUser, logoutUser ,UpdateUser} = user.actions;
export const userReducer = user.reducer;