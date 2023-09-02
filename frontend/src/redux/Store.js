import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import adminReducer from './features/admiSlice'
import centerReducer from './features/CenterSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    admin:adminReducer,
    center:centerReducer,
  },
});

export default store;
