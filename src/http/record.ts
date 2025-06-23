import { useEffect, useState } from "react"
import request from './request'

export function useRecordTypes() {
  let [types, setTypes] = useState({})
  useEffect(() => {
    request('/categories').then(res => {
      setTypes(res.data)
    })
  }, [])
  return types
}

export function useBillingData() {
  return request('/billing_data')
}