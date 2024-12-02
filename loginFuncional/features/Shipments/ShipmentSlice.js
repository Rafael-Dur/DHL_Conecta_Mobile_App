import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosShipmentInstance from '../../api/axiosShipmentsInstance';

export const createShipment = createAsyncThunk(
    'shipments/createShipment',
    async (shipmentData, { rejectWithValue }) => {
      try {
        const response = await axiosShipmentInstance.post('/api/v1/shipments/packages', shipmentData);
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
  
const initialState = {
    shipmentPackageType: 1,
    shippingMethod: 1,
    sender: {
      name: "PRUEBA!!!",
      address: "Caldas 1234",
      country: "Uruguay",
      postalCode: "11900",
      neighborhood: "Belvedere",
      city: "Montevideo",
      phoneNumber: "+59899073333",
    },
    receiver: {
      name: "Marcelo Yuane",
      address: "Agraciada 1234",
      country: "Chile",
      postalCode: "11900",
      neighborhood: "La Teja",
      city: "Montevideo",
      phoneNumber: "+598999999",
    },
    shipmentBox: {
      boxType: 1,
      length: 10,
      width: 10,
      height: 10,
      shipmentPackageUnit: 1,
      weight: 10,
      weightUnit: 1,
    },
    shipmentItems: [
      {
        description: "Te sabor beso negro",
        shipmentProductTypeId: "c6066e87-b893-4b30-a285-98c7985f69fb",
        quantity: 1,
        value: 10,
      },
    ],
    bank: 1,
    loading: false,
    success: false,
    error: null,
    DHLConfirmation:null,
};

const shipmentSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        updateShipmentField: (state, action) => {
            const { key, value } = action.payload;
            state[key] = value; // Actualiza la parte específica del estado
        },
        setShipmentData: (state, action) => {
            return {
                ...state,
                ...action.payload, // Reemplaza el estado actual con los datos nuevos
            };
        },
        clearShipmentState: (state) => {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { updateShipmentField, setShipmentData, clearShipmentState } = shipmentSlice.actions;
export default shipmentSlice.reducer;
