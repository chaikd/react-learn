import { getUserInfo, login as loginFn } from "@/http/auth";
import { getToken, setToken } from "@/utils/token";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: null,
    authToken: getToken() || null
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload
    },
    setAuthToken(state, action) {
      state.authToken = action.payload
      setToken(action.payload)
    }
  }
})

const {setUserInfo, setAuthToken} = authSlice.actions

export {setUserInfo, setAuthToken} 

export const asyncAuthInfo = () => {
  return async (dispatch) => {
    let res = await loginFn()
    dispatch(setAuthToken(res.token))
  }
}

export const asyncUserInfo = () => {
  return async (dispatch) => {
    const userInfo: any = await getUserInfo()
    dispatch(setUserInfo(userInfo))
  }
}

export const selectUserInfo = (state) => {
  return state.auth.userInfo
}
export const selectAuthToken = (state) => {
  return state.auth.authToken
}

export default authSlice.reducer