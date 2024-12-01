import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosAccountInstance';

// Thunk para el registro de usuario
export const registerUser = createAsyncThunk(
  'account/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/accounts', registerData);
      return response.data; // Regresa la respuesta si es exitosa
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error (ej. 500)
        return rejectWithValue(error.response.data || 'Error del servidor.');
      } else if (error.request) {
        // No hubo respuesta del servidor
        return rejectWithValue('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
      } else {
        // Otro error ocurrió
        return rejectWithValue(error.message || 'Ocurrió un error desconocido.');
      }
    }
  }
);

// Thunk para obtener los datos del usuario
export const getUserData = createAsyncThunk(
  'account/getUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/accounts/data');
      return response.data; // Regresa la respuesta si es exitosa
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Regresa el error si ocurre uno
    }
  }
);

//Thunk para cambiar la password :
export const resetPassword = createAsyncThunk(
  'password/reset',
  async (newPassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/accounts/password/reset/validate', newPassword);
      return response.data; // Regresa la respuesta si es exitosa
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        if (error.response.status === 400) {
          // Manejo específico para el error 400
          return rejectWithValue(
            error.response.data?.message ||
            'Solicitud inválida. Por favor, verifica los datos ingresados.'
          );
        }
        // El servidor respondió con un código de error (ej. 500)
        return rejectWithValue(error.response.data || 'Error del servidor.');
      } else if (error.request) {
        // No hubo respuesta del servidor
        return rejectWithValue('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
      } else {
        // Otro error ocurrió
        return rejectWithValue(error. message || 'Ocurrió un error desconocido.');
      }
    }
  });

// Thunk para enviar el correo y obtener el código de recuperación
export const requestOtp = createAsyncThunk(
  'account/getOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/accounts/password/reset', email);
      return response.data; // Regresa la respuesta si es exitosa
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de error
        if (error.response.status === 400) {
          // Manejo específico para el error 400
          return rejectWithValue(
            error.response.data?.message ||
            'Solicitud inválida. Por favor, verifica los datos ingresados.'
          );
        }
        // El servidor respondió con un código de error (ej. 500)
        return rejectWithValue(error.response.data || 'Error del servidor.');
      } else if (error.request) {
        // No hubo respuesta del servidor
        return rejectWithValue('No se pudo conectar al servidor. Por favor, verifica tu conexión.');
      } else {
        // Otro error ocurrió
        return rejectWithValue(error.message || 'Ocurrió un error desconocido.');
      }
    }
  });

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  userData: null, // Para almacenar los datos obtenidos
  code: null,
  email: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearAccountState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
      state.userData = null;
      state.code = null;
      state.email = '';
    },
    saveEmail: (state, action) => {
      state.email = action.payload; // Guardar el correo en Redux
    },
  },
  extraReducers: (builder) => {
    builder
      // Manejo para el POST (registro)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = 'Registro exitoso';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Manejo para el GET (obtener datos)
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data; // Almacena los datos obtenidos
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.code = action.payload.code;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(requestOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.error = false;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.data.code; // Guardar el código en el estado global
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Error al enviar el correo.';
      });
  }
});


export const { saveEmail } = accountSlice.actions;
export const { clearAccountState } = accountSlice.actions;
export default accountSlice.reducer;
