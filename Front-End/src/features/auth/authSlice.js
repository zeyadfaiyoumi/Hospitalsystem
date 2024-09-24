// // src/features/auth/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI } from './authAPI';

// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   const response = await loginAPI(credentials);
//   return response;
// });

// export const register = createAsyncThunk('auth/register', async (userData) => {
//   const response = await registerAPI(userData);
//   return response;
// });

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI } from './authAPI';

// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   try {
//     const response = await loginAPI(credentials);
//     return response;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Login failed');
//   }
// });

// export const register = createAsyncThunk('auth/register', async (userData) => {
//   try {
//     const response = await registerAPI(userData);
//     return response;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Registration failed');
//   }
// });

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
////////////////////////////////////////////////////////
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI } from './authAPI';

// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   const response = await loginAPI(credentials);
//   return response;
// });

// export const register = createAsyncThunk('auth/register', async (userData) => {
//   const response = await registerAPI(userData);
//   return response;
// });

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
/////////////////////////////////////////////////////////////////////
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { loginAPI, registerAPI } from './authAPI';

// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// // Thunks
// export const login = createAsyncThunk('auth/login', async (credentials) => {
//   const response = await loginAPI(credentials);
//   return response;
// });

// export const register = createAsyncThunk('auth/register', async (userData) => {
//   const response = await registerAPI(userData);
//   return response;
// });

// // Slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
///////////////////////////////////////////////////////////////////////////////////
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, registerAPI } from './authAPI';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Thunks
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginAPI(credentials);
  return response;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await registerAPI(userData);
  return response;
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.error = null; 
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user; 
          state.token = action.payload.token; 
          state.error = null; 
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message; 
        })
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export const { logout } = authSlice.actions;
export default authSlice.reducer;
