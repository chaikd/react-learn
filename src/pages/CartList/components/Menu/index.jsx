import classNames from 'classnames'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentMenu, takeawaySelector } from '@/store/modules/takeaway'

const Menu = () => {
  let { menus, currentMenu } = useSelector(takeawaySelector)
  let dispatch = useDispatch()
  let menuChange = (tag) => {
    dispatch(setCurrentMenu(tag))
  }
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus && menus.length > 0 && menus.map((item, index) => {
        return (
          <div
            key={item.tag}
            className={classNames(
              'list-menu-item',
              {
                active: item.tag === currentMenu
              }
            )}
            onClick={() => menuChange(item.tag)}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
