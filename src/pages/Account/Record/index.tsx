import { Button, Input, NavBar } from "antd-mobile";
import { useNavigate } from "react-router";
import './index.scss'
import { useMemo, useState } from "react";
import { useRecordTypes } from "@/http/record";
import classnames from "classnames"
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { setBill } from "@/store/modules/accountSlice";
import _ from "lodash";

function Head({navigate}) {
  const back = () => {
    navigate('/account')
  }
  return (
    <>
      <NavBar className="shadow-md" onBack={back}>
        记一笔
      </NavBar>
    </>
  )
}

function TypeSelect({data: {
  datas, currentType, setCurrentType, billData, setBillData
}}) {
  const onChange = (val) => {
    setBillData({
      ...billData,
      amount: Number.parseFloat(Number(val).toFixed(2))
    })
  }
  return (
    <>
      <div className="text-center mt-2">
        {
          datas?.labels.map(v => {
            return (
              <Button key={v.type} size="small" shape="rounded" className={classnames('!mr-2',{
                '!bg-slate-600 !text-white': v.type === currentType
              })} onClick={() => {
                setCurrentType(v.type)
                setBillData({
                  ...billData,
                  description: '',
                  category: ''
                })
              }}>{v.name}</Button>
            )
          })
        }
      </div>
      <div className="p-4">
        <Input className="!bg-white !px-2 !py-2 !rounded" value={billData.amount} type="number" placeholder="请输入金额" onChange={onChange}></Input>
      </div>
      <div className="flex-1 overflow-auto h-full bg-white p-2 rounded mt-2">
        {
          datas?.current?.value.map(v => {
            return (
              <div key={v.id} className="mt-3">
                <span className={classnames({
                  'text-color-primary': billData.category === v.name
                })}>{v.name}</span>
                <div className="grid grid-cols-3 gap-y-2 mt-2">
                  {
                    v.subcategories.map(item => {
                      return(
                        <span className={
                          classnames({
                            'text-color-primary': billData.description === item.name
                          })
                        } key={item.id}
                          onClick={() => {
                            if (billData.description === item.name) {
                              setBillData({
                                ...billData,
                                category: '',
                                description: ''
                              })
                              return
                            }
                            setBillData({
                              ...billData,
                              category: v.name,
                              description: item.name
                            })
                          }}
                        >{item.name}</span>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default function RecommendAccount() {
  const navigate = useNavigate()
  const [currentType, setCurrentType] = useState('income')
  const [billData, setBillData] = useState<{
    category?: string,
    description?: string,
    amount?: number
  }>({})
  const dispatch = useDispatch()
  const {billData: billList} = useSelector((state: any) => state.account)
  const types = useRecordTypes()
  const datas = useMemo(() => {
    const labels = Object.keys(types).map(type => {
      return {
        name: types[type].name,
        type,
        value: types[type].types
      }
    })
    return {
      labels,
      current: labels.find(v => v.type === currentType)
    }
  }, [types, currentType])
  const submit = () => {
    // {
  //   "id": "T20251001",
  //   "date": "2025-06-05",
  //   "type": "收入",
  //   "category": "工资",
  //   "amount": 22000.00,
  //   "description": "月度工资"
  // },
    let obj = {
      id: `T${dayjs().format('YYYYMMDD')}`,
      date: dayjs().format('YYYY-MM-DD'),
      type: datas?.current?.name,
      category: billData.category,
      description: billData.description,
      amount: billData.amount
    }
    let newBill = _.cloneDeep(billList)
    let monthly = newBill.monthly_summary.find(v => v.month === dayjs(obj.date).format('YYYY-MM'))
    let id = monthly.transactions[monthly.transactions.length - 1].id
    obj.id = `T${Number(id.slice(1)) + 1}`
    monthly.transactions.push(obj)
    dispatch(setBill({
      ...newBill,
    }))
    setBillData({})
    navigate('/account')
  }
  return (
    <>
      <div className="record bg-color h-screen flex flex-col">
        <Head navigate={navigate}></Head>
        <TypeSelect data={{
          datas,
          currentType,
          setCurrentType,
          billData,
          setBillData
        }}></TypeSelect>
      </div>
      <div className="fixed bottom-4 text-center w-full">
        <Button color="primary" size="small" onClick={submit}>保存</Button>
      </div>
    </>
  )
}