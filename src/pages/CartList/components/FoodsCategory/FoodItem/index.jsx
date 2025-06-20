import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
import { setCartList, takeawaySelector } from '@/store/modules/takeaway'

const Foods = ({
  item,
  id,
  picture,
  name,
  unit,
  description,
  food_tag_list,
  month_saled,
  like_ratio_desc,
  price,
  // tag,
  // count
}) => {
  const dispatch = useDispatch()
  const { cartList } = useSelector(takeawaySelector)
  const addIntoCart = () => {
    let cur = cartList.find(v => v.id === id)
    let newList = [...cartList]
    if (cur) {
      newList = newList.map(v => {
        let obj = { ...v }
        if (obj.id === id) {
          obj.count += 1
        }
        return obj
      })
    } else {
      newList.push({ ...item, count: 1 })
    }
    dispatch(setCartList(newList))
  }
  return (
    <dd className="cate-goods">
      <div className="goods-img-wrap">
        <img src={picture} alt="" className="goods-img" />
      </div>
      <div className="goods-info">
        <div className="goods-desc">
          <div className="goods-title">{name}</div>
          <div className="goods-detail">
            <div className="goods-unit">{unit}</div>
            <div className="goods-detail-text">{description}</div>
          </div>
          <div className="goods-tag">{food_tag_list.join(' ')}</div>
          <div className="goods-sales-volume">
            <span className="goods-num">月售{month_saled}</span>
            <span className="goods-num">{like_ratio_desc}</span>
          </div>
        </div>
        <div className="goods-price-count">
          <div className="goods-price">
            <span className="goods-price-unit">¥</span>
            {price}
          </div>
          <div className="goods-count" onClick={() => addIntoCart()}>
            <span className="plus">+</span>
          </div>
        </div>
      </div>
    </dd>
  )
}

export default Foods
