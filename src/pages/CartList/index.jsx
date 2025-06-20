import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Cart from './components/Cart'
import FoodsCategory from './components/FoodsCategory'
import { setTakeawayMenusAsync, takeawaySelector } from '@/store/modules/takeaway'

import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTakeawayMenusAsync())
  }, [dispatch])
  let { menus: foodsList, currentMenu } = useSelector(takeawaySelector)
  useEffect(() => {

  }, [currentMenu])
  return (
    <div className="home">
      {/* 导航 */}
      <NavBar />

      {/* 内容 */}
      <div className="content-wrap">
        <div className="content">
          <Menu />

          <div className="list-content">
            <div className="goods-list">
              {/* 外卖商品列表 */}
              {foodsList && foodsList.length > 0 && foodsList.map(item => {
                return (
                  <FoodsCategory
                    key={item.tag}
                    // 列表标题
                    name={item.name}
                    // 列表商品
                    foods={item.foods}
                    tag={item.tag}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 购物车 */}
      <Cart />
    </div>
  )
}

export default App
