import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';

// Configure the store
const store = configureStore({
    reducer: {
        users: userReducer,
        roles: roleReducer,
    },
});

export default store;
