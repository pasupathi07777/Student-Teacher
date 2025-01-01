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



export const resetPass = createAsyncThunk(
  'auth/resetPass',
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
  verfiyEmail: null,
};

// // Initial State
// const initialState = {
//   loading: false,
//   email: '',
//   otpVerified: false,
//   resetPasswordForm: {
//     newPassword: '',
//     confirmPassword: '',
//     errors: {
//       newPassword: '',
//       confirmPassword: '',
//       other: '',
//     },
//   },
//   errors: {},
// };

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
        console.log(action.payload.email);
        state.verfiyEmail = action.payload.email;
      })
      .addCase(verfiyEmail.rejected, (state, action) => {
        state.Loading = false;
        console.log(action.payload, 'action.payload');
      });
  },
});

export const {updateResetPasswordForm, setRestPasswordErrors} =
  resetPasswordSlice.actions;
export const resetPasswordState = state => state.resetPasswordReducer;
export default resetPasswordSlice.reducer;



// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import backendUrl from '../../api/backendUrl';
// import {validateFields} from '../../utils/validationFunction';

// const PORT = backendUrl();

// // Async Thunks
// export const verifyEmail = createAsyncThunk(
//   'auth/verifyEmail',
//   async (credentials, {rejectWithValue}) => {
//     try {
//       const errors = validateFields(credentials);
//       if (Object.keys(errors).length > 0) {
//         return rejectWithValue({errors});
//       }
//       const response = await axios.post(
//         `${PORT}/api/auth/otpSenter`,
//         credentials,
//       );
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || {message: 'Something went wrong'};
//       return rejectWithValue(error);
//     }
//   },
// );

// export const resetPassword = createAsyncThunk(
//   'auth/resetPassword',
//   async (credentials, {rejectWithValue}) => {
//     try {
//       const errors = validateFields(credentials);
//       if (Object.keys(errors).length > 0) {
//         return rejectWithValue({errors});
//       }
//       const response = await axios.post(
//         `${PORT}/api/auth/resetPassword`,
//         credentials,
//       );
//       return response.data;
//     } catch (err) {
//       const error = err.response?.data || {message: 'Something went wrong'};
//       return rejectWithValue(error);
//     }
//   },
// );

// // Initial State
// const initialState = {
//   loading: false,
//   email: '',
//   otpVerified: false,
//   resetPasswordForm: {
//     newPassword: '',
//     confirmPassword: '',
//     errors: {
//       newPassword: '',
//       confirmPassword: '',
//       other: '',
//     },
//   },
//   errors: {},
// };

// // Combined Slice
// const resetPasswordSlice = createSlice({
//   name: 'resetPasswordSlice',
//   initialState,
//   reducers: {
//     updateResetPasswordForm: (state, action) => {
//       const {field, value} = action.payload;
//       state.resetPasswordForm[field] = value;
//       state.resetPasswordForm.errors[field] = '';
//     },
//     setErrors: (state, action) => {
//       const {errors} = action.payload;
//       if (Array.isArray(errors)) {
//         errors.forEach(errorObj => {
//           const {field, error} = errorObj;
//           if (field && state.resetPasswordForm.errors.hasOwnProperty(field)) {
//             state.resetPasswordForm.errors[field] = error;
//           }
//         });
//       }
//     },
//     resetState: state => {
//       Object.assign(state, initialState);
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(verifyEmail.pending, state => {
//         state.loading = true;
//       })
//       .addCase(verifyEmail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.email = action.payload.email;
//         state.otpVerified = true;
//       })
//       .addCase(verifyEmail.rejected, (state, action) => {
//         state.loading = false;
//         state.errors = action.payload.errors || {};
//       })
//       .addCase(resetPassword.pending, state => {
//         state.loading = true;
//       })
//       .addCase(resetPassword.fulfilled, state => {
//         state.loading = false;
//         state.resetPasswordForm = initialState.resetPasswordForm;
//         state.otpVerified = false;
//       })
//       .addCase(resetPassword.rejected, (state, action) => {
//         state.loading = false;
//         state.errors = action.payload.errors || {};
//       });
//   },
// });

// export const {updateResetPasswordForm, setErrors, resetState} =
//   resetPasswordSlice.actions;
// export const resetPasswordState = state => state.resetPasswordReducer;
// export default resetPasswordSlice.reducer;
