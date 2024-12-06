import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosShipmentInstance from '../../api/axiosShipmentsInstance';

// Acción para crear el envío
export const createShipment = createAsyncThunk(
  'shipments/createShipment',
  async (shipmentData, { getState, rejectWithValue }) => {
    try {
      const { shipments } = getState();
      const response = await axiosShipmentInstance.post('/api/v1/shipments/packages', shipments);
      return response.data; // Devuelve los datos si es exitoso
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || 'Error del servidor.');
      } else if (error.request) {
        return rejectWithValue('No se pudo conectar al servidor.');
      } else {
        return rejectWithValue(error.message || 'Ocurrió un error desconocido.');
      }
    }
  }
);
// Acción para crear un envío de documentos
export const createDocumentShipment = createAsyncThunk(
  'shipments/createDocumentShipment',
  async (shipmentData, { getState, rejectWithValue }) => {
    try {
      const { shipments } = getState();
      const response = await axiosShipmentInstance.post('/api/v1/shipments/documents', shipments);
      return response.data; // Devuelve los datos si es exitoso
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data || 'Error del servidor.');
      } else if (error.request) {
        return rejectWithValue('No se pudo conectar al servidor.');
      } else {
        return rejectWithValue(error.message || 'Ocurrió un error desconocido.');
      }
    }
  }
);

// Acción para obtener las categorías de productos
export const fetchProductCategories = createAsyncThunk(
  'shipments/fetchProductCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosShipmentInstance.get('/api/v1/shipments/product-categories');
      if (response.data.success) {
        return response.data.data; // Devuelve las categorías si es exitoso
      }
      throw new Error('No se pudieron obtener las categorías');
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener las categorías');
    }
  }
);

const initialState = {
  shipmentPackageType: 1,
  shippingMethod: 1,
  sender: {
    name: '12',
    address: '12',
    country: 'URUGUAY',
    postalCode: '12',
    neighborhood: '12',
    city: '12',
    phoneNumber: '+598999999',
  },
  receiver: {
    name: '12',
    address: '12',
    country: 'ARGENTINA',
    postalCode: '12',
    neighborhood: '12',
    city: '12',
    phoneNumber: '+598999999',
  },
  shipmentBox: {
    boxType: 1,
    length: 12,
    width: 12,
    height: 12,
    shipmentPackageUnit: 1,
    weight: 12,
    weightUnit: 1,
  },
  shipmentItems: [
    {
      description: '12',
      shipmentProductTypeId: 'b00b5e4d-dce5-460f-b034-e28b33cb0e9f',
      quantity: 1,
      value: 12,
    },
  ],
  bank: 1,
  loading: false,
  success: false,
  error: null,
  DHLConfirmation: null,
  productCategories: [], // Nuevo campo para almacenar las categorías de productos
};

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    updateShipmentField: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setShipmentData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearShipmentState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      // Crear envío
      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.DHLConfirmation = action.payload.data.internalDhlReference;
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Crear envío de documentos
      .addCase(createDocumentShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocumentShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.DHLConfirmation = action.payload.data.internalDhlReference;
      })
      .addCase(createDocumentShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Obtener categorías de productos
      .addCase(fetchProductCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateShipmentField, setShipmentData, clearShipmentState } = shipmentSlice.actions;
export default shipmentSlice.reducer;
