import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { increCount, minusCount, setCartList, takeawaySelector } from '@/store/modules/takeaway'
import { useState } from 'react'

const Cart = () => {
  const { cartList: cart } = useSelector(takeawaySelector)
  const [showList, setShowList] = useState(false)
  const dispatch = useDispatch()
  let m = Math.pow(10, 10)
  let totalCount = cart.reduce((pre, cur) => (pre + cur.count), 0)
  const totalPrice = cart.reduce((pre, cur) => {
    return (parseInt((pre + (cur.price * cur.count)) * m) / m)
  }, 0)
  const onMinus = (item) => {
    dispatch(minusCount(item.id))
  }
  const onPlus = (item) => {
    dispatch(increCount(item.id))
  }

  const clearCart = () => {
    dispatch(setCartList([]))
  }

  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay', {
          visible: showList
        })}
        onClick={() => setShowList(!showList)}
      />
      <div className="cart" onClick={() => setShowList(!showList)}>
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div className={classNames('icon')}>
          {<div className="cartCornerMark">{cart?.length > 0 ? totalCount : 0}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {cart?.length > 0 ? totalPrice : 0}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {cart.length > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', { visible: showList })}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={clearCart}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cart.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    onMinus={() => onMinus(item)}
                    count={item.count}
                    onPlus={() => onPlus(item)}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
