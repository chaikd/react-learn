import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./modules/countSlice";
import authReducer from "./modules/authSlice";
import takeawayReducer from './modules/takeaway'
import accountReducer from "./modules/accountSlice";

const store = configureStore({
  reducer: {
    count: countReducer,
    auth: authReducer,
    takeaway: takeawayReducer,
    account: accountReducer
  }
})

export default store