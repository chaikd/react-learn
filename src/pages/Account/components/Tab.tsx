import { TabBar } from "antd-mobile";
import {AddOutline, AppOutline, CouponOutline} from 'antd-mobile-icons'
import { Link, useNavigate } from "react-router";
import {useState} from 'react'

export default function Tab() {
  const [activeKey, setActiveKey] = useState('mounth')
  const navigage = useNavigate()
  const tabs = [
    {
      label: '月度收支',
      type: 'mounth',
      href: '/account',
      icon: <AppOutline />
    },
    {
      label: '记录',
      type: 'recommend',
      href: '/account/recommend',
      icon: <AddOutline />
    },
    {
      label: '年度账单',
      type: 'year',
      href: '/account/year',
      icon: <CouponOutline />
    },
  ]
  const onTabBarChange = (key) => {
    setActiveKey(key)
    const current = tabs.find(v => v.type === key)
    navigage(current?.href)
  }
  return (
    <TabBar activeKey={activeKey} onChange={onTabBarChange}>
      {tabs.map(item => (
        // <Link to={item.href}>
          <TabBar.Item key={item.type} icon={item.icon} title={item.label} />
        // </Link>
      ))}
    </TabBar>
  )
}