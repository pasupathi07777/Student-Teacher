
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';
import { validateFields } from '../../utils/validationFunction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../utils/tokenFunction';

const PORT = backendUrl();

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const errors = validateFields(credentials);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({ errors });
      }

      const response = await axios.post(`${PORT}/api/auth/login`, credentials);

      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
      }

      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: 'Something went wrong' };
      return rejectWithValue(error);
    }
  }
);

export const getUserAuth = createAsyncThunk(
  'auth/token',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getToken();
      console.log(token, 'token');  
      if (!token) return rejectWithValue({ message: 'No token found' });

      const response = await axios.post(`${PORT}/api/auth/checkToken`, { token });
      return response.data;
    } catch (err) {
      const error = err.response?.data || { message: 'Something went wrong' };
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem('authToken');
      return {};  // Just return empty object or any necessary value
    } catch (err) {
      return rejectWithValue({ message: 'Error during logout' });
    }
  }
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
  loginStatus: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLoginForm: (state, action) => {
      const { field, value } = action.payload;
      state.loginForm[field] = value;
      state.loginForm.errors[field] = '';
    },
    setLoginErrors: (state, action) => {
      const { errors } = action.payload;
      if (Array.isArray(errors)) {
        errors.forEach(({ field, error }) => {
          if (field && state.loginForm.errors.hasOwnProperty(field)) {
            state.loginForm.errors[field] = error;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        state.loginForm = initialState.loginForm;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
      })


      .addCase(getUserAuth.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload.user;
        state.loginStatus = true;
        console.log(action.payload, 'action.payload');
        
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.loginLoading = false;
        console.log(action.payload, 'action.payload');  // Check the error message
        
      })


      .addCase(logout.fulfilled, (state) => {
        state.currentUser = {};
        state.loginStatus = false;
        state.loginForm = initialState.loginForm;
      });
  },
});

export const { updateLoginForm, setLoginErrors } = loginSlice.actions;
export const loginState = (state) => state.loginReducer;
export default loginSlice.reducer;
