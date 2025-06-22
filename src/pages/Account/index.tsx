import Tab from "./components/Tab";
import { Outlet } from 'react-router';
import './index.scss'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncSetBill } from "@/store/modules/accountSlice";

export default function Account() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<any>(asyncSetBill())
  }, [dispatch])
  return <>
    <div className="account-theme h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <Outlet></Outlet>
      </div>
      <div className="shadow-2xl">
        <Tab></Tab>
      </div>
    </div>
  </>
}