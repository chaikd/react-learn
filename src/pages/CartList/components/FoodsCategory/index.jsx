import { useSelector } from 'react-redux'
import FoodItem from './FoodItem'
import './index.scss'
import { useEffect, useRef } from 'react'
import { takeawaySelector } from '@/store/modules/takeaway'

const FoodsCategory = ({ name, foods, tag }) => {
  let listRef = useRef(null)
  let { currentMenu } = useSelector(takeawaySelector)
  useEffect(() => {
    if (currentMenu === tag) {
      listRef.current.scrollIntoView()
    }
  }, [currentMenu, tag])
  return (
    <div className="category">
      <dl className="cate-list" ref={listRef}>
        <dt className="cate-title">{name}</dt>

        {foods.map(item => {
          return <FoodItem key={item.id} item={item} {...item} />
        })}
      </dl>
    </div>
  )
}

export default FoodsCategory
