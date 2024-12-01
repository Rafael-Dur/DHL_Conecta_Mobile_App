import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import accountReducer from '../features/auth/accountSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer, 
  },
});

export default store;
