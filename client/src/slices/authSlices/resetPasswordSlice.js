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
        `${PORT}/api/auth/verifyEmail`,
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


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const errors = validateFields(credentials);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({errors});
      }
      console.log(credentials);
      const response = await axios.post(`${PORT}/api/auth/login`, credentials);
      return response.data;
    } catch (err) {
      console.log(err, 'err');

      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  loginLoading: false,
  loginForm: {
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  },
  currentUser: {},
};

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    updateLoginForm: (state, action) => {
      const {field, value} = action.payload;
      state.loginForm[field] = value;
      state.loginForm.errors[field] = '';
    },
    setLoginErrors: (state, action) => {
      const {errors} = action.payload;
      console.log(errors);
      if (Array.isArray(errors)) {
        errors.forEach(errorObj => {
          const {field, error} = errorObj;
          if (field && state.loginForm.errors.hasOwnProperty(field)) {
            state.loginForm.errors[field] = error;
          }
        });
      }
      console.log(state.loginForm, 'login form errors ');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload;
        state.loginForm = initialState.loginForm;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, 'action.payload');
      });
  },
});

export const {updateLoginForm, setLoginErrors} = resetPasswordSlice.actions;
export const resetPasswordState = state => state.resetPasswordReducer;
export default resetPasswordSlice.reducer;
