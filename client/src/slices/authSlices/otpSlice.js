// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';
// // import backendUrl from '../../api/backendUrl';

// // const PORT = backendUrl();

// // // Async thunk for verifying OTP
// // export const verifyOtp = createAsyncThunk(
// //   'auth/verifyOtp',
  
// //   async (otpCode, { rejectWithValue }) => {
// //     try {
// //         console.log(otpCode);
        
// //       const response = await axios.post(`${PORT}/api/auth/verifyOTP`, { otp: otpCode });
// //       return response.data;
// //     } catch (err) {
// //       const error = err.response?.data || { message: 'Something went wrong' };
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // const initialState = {
// //   otp: ['', '', '', '', ''],
// //   loading: false,
// //   error: null,
// //   successMessage: null,
// // };

// // const otpSlice = createSlice({
// //   name: 'otp',
// //   initialState,
// //   reducers: {
// //     updateOtp: (state, action) => {
// //       const { index, value } = action.payload;
// //       state.otp[index] = value;
// //     },
// //     clearOtp: (state) => {
// //       state.otp = ['', '', '', '', ''];
// //       state.error = null;
// //       state.successMessage = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(verifyOtp.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //         state.successMessage = null;
// //       })
// //       .addCase(verifyOtp.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.successMessage = action.payload.message;
// //       })
// //       .addCase(verifyOtp.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload.message;
// //       });
// //   },
// // });

// // export const { updateOtp, clearOtp } = otpSlice.actions;
// // export const selectOtpState = (state) => state.otpReducer;
// // export default otpSlice.reducer;



// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios'; // Assuming you may want to interact with an API for OTP verification

// export const verifyOtp = createAsyncThunk(
//   'otp/verifyOtp',
//   async (otpCode, thunkAPI) => {
//     try {
//       const response = await axios.post('/api/verify-otp', {otp: otpCode});
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const otpSlice = createSlice({
//   name: 'otp',
//   initialState: {
//     otp: ['', '', '', '', ''],
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     updateOtp: (state, action) => {
//       const {index, value} = action.payload;
//       state.otp[index] = value;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(verifyOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(verifyOtp.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(verifyOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { updateOtp } = otpSlice.actions;
// export const selectOtpState = (state) => state.otpReducer;
// export default otpSlice.reducer;


import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (otpCode, thunkAPI) => {
    try {
      const response = await axios.post('/api/verify-otp', {otp: otpCode});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    otp: ['', '', '', '', ''],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    updateOtp: (state, action) => {
      const {index, value} = action.payload;
      state.otp[index] = value;
    },
    clearOtp: (state) => {
      state.otp = ['', '', '', '', ''];
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOtp, clearOtp } = otpSlice.actions;
export const selectOtpState = (state) => state.otpReducer;
export default otpSlice.reducer;
