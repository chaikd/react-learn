import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

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
    const res = await axios('http://localhost:3004/billing_data')
    dispatch(setBill(res.data))
  }
}

const {setBill} = accountSlice.actions

export {setBill, asyncSetBill}

export default accountSlice.reducer