import { getUserInfo } from "@/http/auth";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    authToken: null
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setAuthToken(state, action) {
      state.authToken = action.payload
    }
  }
})

const {setUserInfo, setAuthToken} = authSlice.actions

export {setUserInfo, setAuthToken} 

export const asyncAuthInfo = () => {
  return async (dispatch) => {
    const userInfo = await getUserInfo()
    dispatch(setUserInfo(userInfo))
  }
}

export const selectUserInfo = (state) => {
  console.log('state: ', state);
  return state.auth.userInfo
}
export const selectAuthToken = (state) => {
  return state.auth.authToken
}

export default authSlice.reducer