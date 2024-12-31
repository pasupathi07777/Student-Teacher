import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';
import {validateFields} from '../../utils/validationFunction';

const PORT = backendUrl();

export const verfiyEmail = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const errors = validateFields(credentials);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({errors});
      }
      console.log(credentials);
      const response = await axios.post(
        `${PORT}/api/auth/otpSenter`,
        credentials,
      );
      return response.data;
    } catch (err) {
      console.log(err, 'err');

      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);


export const otpVerify = createAsyncThunk(
  'auth/otpVerify',
  async (credentials, {rejectWithValue}) => {
    try {

      const response = await axios.post(
        `${PORT}/api/auth/verifyOTP`,
        credentials,
      );
      return response.data;
    } catch (err) {
      console.log(err, 'err');

      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);






const initialState = {
  Loading: false,
  resetPasswordForm: {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
      other: '',
    },
  },
  currentUser: {},
  



};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    updateResetPasswordForm: (state, action) => {
      const {field, value} = action.payload;
      state.resetPasswordForm[field] = value;
      state.resetPasswordForm.errors[field] = '';
    },
    setRestPasswordErrors: (state, action) => {
      console.log('hii ka');

      const {errors} = action.payload;
      console.log(errors);
      if (Array.isArray(errors)) {
        errors.forEach(errorObj => {
          const {field, error} = errorObj;
          if (field && state.resetPasswordForm.errors.hasOwnProperty(field)) {
            state.resetPasswordForm.errors[field] = error;
          }
        });
      }
      console.log(state.resetPasswordForm, 'login form errors ');
    },
  },
  extraReducers: builder => {
    builder
    // verfiyEmail
      .addCase(verfiyEmail.pending, state => {
        state.Loading = true;
      })
      .addCase(verfiyEmail.fulfilled, (state, action) => {
        state.Loading = false;
        state.loginForm = initialState.loginForm;
        console.log(action.payload);
      })
      .addCase(verfiyEmail.rejected, (state, action) => {
        state.Loading = false;
        console.log(action.payload, 'action.payload');
      })
      
      // otpVerify
      .addCase(otpVerify.pending, state => {
        state.Loading = true;
      })
      .addCase(otpVerify.fulfilled, (state, action) => {
        state.Loading = false;
        console.log(action.payload);
      })
      .addCase(otpVerify.rejected, (state, action) => {
        state.Loading = false;
        console.log(action.payload, 'action.payload');
      })
  },
});

export const {updateResetPasswordForm, setRestPasswordErrors} =
  resetPasswordSlice.actions;
export const resetPasswordState = state => state.resetPasswordReducer;
export default resetPasswordSlice.reducer;
