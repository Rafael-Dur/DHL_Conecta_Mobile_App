import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Thunk para el login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', loginData);
      return response.data; // Retorna la respuesta del login
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // En caso de error
    }
  }
);

// Thunk para el logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/logout');
      return response.data; // Respuesta de logout
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // En caso de error
    }
  }
);

// Estado inicial
const initialState = {
  jwtToken: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Manejo de la acción de login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.jwtToken = action.payload.data.jwtToken; // Guardamos el token
        state.response = action.payload; // Almacenamos toda la respuesta
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Manejo de la acción de logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.jwtToken = null; // Limpiar el token
        state.success = true;
        state.message = 'Logout exitoso';
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
