import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/auth/accountSlice'; 
import shipmentReducer from '../features/Shipments/ShipmentSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer, 
    shipments: shipmentReducer,
    },
});

export default store;
