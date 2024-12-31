import { configureStore } from '@reduxjs/toolkit'
import  signupSlice  from '../slices/authSlices/signupSlice'
import loginSlice from '../slices/authSlices/loginSlice';
import resetPasswordSlice from '../slices/authSlices/resetPasswordSlice';
import  otpSlice  from '../slices/authSlices/otpSlice';



export const store = configureStore({
  reducer: {

    signupReducer: signupSlice,
    loginReducer: loginSlice,
    resetPasswordReducer: resetPasswordSlice,
    otpReducer: otpSlice,
  },
});