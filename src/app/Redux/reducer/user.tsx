'use client';

import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  userDetails: {
    _id:"",
    utype:'',
    email:"tahashamji@gmail.com",
    fullName:"Taha",
    position:"Engineer",
    description:'Elite',
    availability:"Online",
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
  loggedIn: true
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