import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./modules/countSlice";
import authReducer from "./modules/authSlice";
import takeawayReducer from './modules/takeaway'

const store = configureStore({
  reducer: {
    count: countReducer,
    auth: authReducer,
    takeaway: takeawayReducer,
  }
})

export default store