import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const takeawaySlice = createSlice({
  name: 'takeaway',
  initialState: {
    menus: null,
    currentMenu: null,
    cartList: []
  },
  reducers: {
    setTakeawayMenus(state, action) {
      state.menus = action.payload
    },
    setCurrentMenu(state, action) {
      state.currentMenu = action.payload
    },
    setCartList(state, action) {
      state.cartList = action.payload
    },
    increCount(state, action) {
      let id = action.payload
      let cur = state.cartList.find(v => v.id === id)
      cur.count++
    },
    minusCount(state, action) {
      let id = action.payload
      let cur = state.cartList.find(v => v.id === id)
      if (cur.count === 0) return
      cur.count--
    }
  }
})

const { setTakeawayMenus, setCurrentMenu, setCartList, increCount, minusCount } = takeawaySlice.actions

const setTakeawayMenusAsync = () => {
  return async (dispatch) => {
    const res = await axios.get('http://localhost:3004/takeaway')
    dispatch(setTakeawayMenus(res.data))
    dispatch(setCurrentMenu(res.data[0].tag))
  }
}

const takeawaySelector = (state) => {
  return state.takeaway
}

export { setTakeawayMenus, setCurrentMenu, setCartList, increCount, minusCount, setTakeawayMenusAsync, takeawaySelector }

const reducer = takeawaySlice.reducer

export default reducer