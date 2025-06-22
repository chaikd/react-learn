import { Card, DatePicker, Divider, NavBar } from "antd-mobile";
import './index.scss'
import dayjs from "dayjs";
import { DownOutline } from "antd-mobile-icons";
import classnames from 'classnames'
import {useMemo, useState} from 'react'
import { useSelector } from "react-redux";
import React from "react";
import _ from 'lodash'
import { accurate } from "@/utils/calculate";

function DayItem({data}) {
  let [isShowMonth, setIsShowMonth] = useState(false)
  return (
    <Card className="shadow-md">
      <div className="flex justify-between" onClick={() => setIsShowMonth(!isShowMonth)}>
        <span>{data.date}</span>
        <DownOutline className={classnames('origin-center', {'rotate-180': isShowMonth})}></DownOutline>
      </div>
      <div className="grid grid-cols-3 grid-row-2 mt-2">
        <div>
          <p>{data.expenses || 0}</p>
          <p className="text-red-400">支出</p>
        </div>
        <div>
          <p>{data.income || 0}</p>
          <p className="text-color-primary">收入</p>
        </div>
        <div>
          <p>{data.balance || 0}</p>
          <p>结余</p>
        </div>
      </div>
      <div className={classnames({'hidden': !isShowMonth})}>
        <Divider />
        {data.transactions?.map((v, key) => {
          return (
            <div className="flex justify-between mt-2" key={key}>
              <span>{v.category}</span>
              <span className={classnames({
                'text-color-primary': v.type === '收入',
                'text-red-400': v.type === '支出',
              })}>{v.amount}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function MonthItem({list = []}) {
  // {
  //   "id": "T20231007",
  //   "date": "2025-06-28",
  //   "type": "支出",
  //   "category": "娱乐",
  //   "amount": 740.00,
  //   "description": "电影及游戏充值",
  //   "payment_method": "支付宝"
  // }
  let data = useMemo(() => {
    let datas = _.groupBy(list, 'date')
    let keys = Object.keys(datas)
    let totalAmount = (arr = [], type) => {
      if(!arr || arr.length < 1) return 0
      return arr.filter(v => v.type === type).reduce((pre, cur) => accurate(pre + cur.amount), 0)
    }
    let value = {}
    keys.forEach(date => {
      let transactions = datas[date]
      value[date] = {
        date,
        expenses: totalAmount(transactions, '支出'),
        income: totalAmount(transactions, '收入'),
        balance: 0,
        transactions
      }
    })
    return {
      value,
      keys: Object.keys(datas)
    }
  }, [list])
  
  return (
    <React.Fragment>
      {
        data?.keys && data.keys.map(key => (
          <div className="mt-2" key={key}>
            <DayItem data={data.value[key]}>
            </DayItem>
          </div>
        ))
      }
    </React.Fragment>
  )
}

export default function MounthAccount() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isShowMonth, setisShowMonth] = useState(false)
  const {billData} = useSelector((state: any) => state.account)
  const currentMonth = useMemo(() => {
    return billData?.monthly_summary?.find(v => v.month === dayjs(currentDate).format('YYYY-MM')) || {}
  }, [currentDate, billData])
  return (
    <div className="mounth">
      <NavBar backIcon={false}>月度收支</NavBar>
      <div className="content-main p-4">
        <Card className="card text-white">
          <div className="px-2">
            <div className="head flex items-center" onClick={() => setisShowMonth(!isShowMonth)}>
              <span>{dayjs(currentDate).year()} | {dayjs(currentDate).month() + 1}月账单</span>
              <DownOutline className={classnames('origin-center', {'rotate-180': isShowMonth})}></DownOutline>
            </div>
            <div className="info w-full flex justify-between text-center mt-2">
              <div>
                <p>{currentMonth.expenses || 0}</p>
                <p className="text-red-200">支出</p>
              </div>
              <div>
                <p>{currentMonth.income || 0}</p>
                <p className="text-color-primary">收入</p>
              </div>
              <div>
                <p>{currentMonth.balance || 0}</p>
                <p>结余</p>
              </div>
            </div>
          </div>
        </Card>
        <DatePicker
          visible={isShowMonth}
          precision='month'
          max={new Date()}
          onClose={() => {
            setisShowMonth(false)
          }}
          onConfirm={val => {
            setCurrentDate(new Date(val))
          }}
        />
        <div className="content-list">
          <MonthItem list={currentMonth.transactions}></MonthItem>
        </div>
      </div>
    </div>
  )
}