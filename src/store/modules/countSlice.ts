import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: 'count',
  initialState: {
    value: 0
  },
  reducers: {
    double(state) {
      state.value *= 2
    },
    increment(state) {
      ++ state.value
    },
    decrement(state) {
      -- state.value
    },
    withPayload(state, action) {
      console.log(action)
      action = action.payload
      switch (action.type){
        case 'increment':
          state.value += action.payload
          break;
        case 'decrement':
          state.value -= action.payload
          break;
      }
    }
  }
})

export const selectCount = (state) => state.count.value

const {double, increment, decrement, withPayload} = countSlice.actions
export {
  double, increment, decrement, withPayload
}

export default countSlice.reducer