import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import backendUrl from '../../api/backendUrl';
import { validateFields } from '../../utils/validationFunction';

const PORT = backendUrl();
export const resetPassword = createAsyncThunk(
  'resetPassword/reset',
  async (payload, {rejectWithValue}) => {
    const errors = validateFields(payload);
    if (Object.keys(errors).length > 0) {
      return rejectWithValue({errors});
    }    
    try {
      const response = await axios.post(
        `${PORT}/api/auth/resetPassword`,
        payload,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || 'Something went wrong');
    }
  },
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    password: '',
    confirmPassword: '',
    loading: false,
    success: null,
    error: null,
    validationErrors: {},
  },
  reducers: {
    updateField: (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
      if (state.validationErrors[field]) {
        state.validationErrors[field] = '';
      }
    },
    validateFieldss: state => {
      const errors = {};
      if (!state.password) errors.password = 'Password is required';
      if (!state.confirmPassword)
        errors.confirmPassword = 'Confirm Password is required';
      if (
        state.password &&
        state.confirmPassword &&
        state.password !== state.confirmPassword
      ) {
        errors.confirmPassword = 'Passwords do not match';
      }
      state.validationErrors = errors;
    },
    clearStatus: state => {
      state.success = null;
      state.error = null;
      state.validationErrors = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.success = null;
        // state.error = action.payload;
        console.log(action.payload);
      });
  },
});

export const {updateField, validateFieldss, clearStatus} =
  resetPasswordSlice.actions;
export const resetPasswordStates = state => state.resetPasswordReducer;
export default resetPasswordSlice.reducer;
