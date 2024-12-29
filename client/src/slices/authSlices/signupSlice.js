import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';
import {validateFields} from '../../utils/validationFunction';


const PORT = backendUrl();
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials, {rejectWithValue}) => {
    try {
      const errors = validateFields(credentials);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({errors});
      } 
      console.log(credentials);
      const response = await axios.post(`${PORT}/api/auth/signup`, credentials);
      return response.data;
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err);
      const error = err.response?.data || {message: 'Something went wrong'};
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  loginStatus: false,
  loading: {
    login: false,
    signup: false,
    passwordReset: false,
  },
  currentUser: {},
  signupForm: {
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      email: '',
      password: '',
      other: '',
    },
  },
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    updateSignupForm: (state, action) => {
      const {field, value} = action.payload;
      state.signupForm[field] = value;
      state.signupForm.errors[field] = '';
    },
    setSignupErrors: (state, action) => {
      const {errors} = action.payload;

      if (Array.isArray(errors)) {
        errors.forEach(errorObj => {
          const {field, error} = errorObj;
          if (field && state.signupForm.errors.hasOwnProperty(field)) {
            state.signupForm.errors[field] = error;
          }
        });
      }

      console.log('Updated Errors:', state.signupForm.errors);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.loading.signup = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading.signup = false;
        state.signupForm = initialState.signupForm;
        console.log('Signup Successful:', action.payload);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading.signup = false;
        console.error('Signup Rejected:', action.payload);
      });
  },
});

export const {updateSignupForm, setSignupErrors} = signupSlice.actions;
export const signupState = state => state.signupReducer;
export default signupSlice.reducer;
