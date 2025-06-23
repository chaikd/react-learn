import request from "@/http/request";
import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    billData: null
  },
  reducers: {
    setBill(state, action) {
      state.billData = action.payload
    }
  }
})

const asyncSetBill = () => {
  return async (dispatch) => {
    const res = await request('/billing_data')
    dispatch(setBill(res.data))
  }
}

const {setBill} = accountSlice.actions

export {setBill, asyncSetBill}

export default accountSlice.reducer