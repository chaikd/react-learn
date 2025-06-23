import { createBrowserRouter } from "react-router";
import Login from "@/pages/Login";
import CartList from '@/pages/CartList'
import DefaultLayout from "@/pages/Layout/DefaultLayout";
import NotFound from "@/pages/Layout/NotFound";
import AccountLayout from "@/pages/Layout/AccountLayout";
import { lazy } from "react";

const Comments = lazy(() => import('@/pages/Comments'))
const Logo = lazy(() => import("@/pages/Logo"))
const Form = lazy(() => import('@/pages/Form/index'))
const List = lazy(() => import("@/pages/List"))
const Redux = lazy(() => import("@/pages/Redux"))
const Account = lazy(() => import("@/pages/Account"))
const MounthAccount = lazy(() => import("@/pages/Account/Mounth"))
const YearAccount = lazy(() => import("@/pages/Account/Year"))
const RecordAccount = lazy(() => import("@/pages/Account/Record"))
const ParentClass = lazy(() => import("@/pages/ClassComponent"))
const Zustand = lazy(() => import("@/pages/Zustand"))

let router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        index: true,
        Component: CartList,
      },
      {
        path: "/comments",
        Component: Comments,
      },
      {
        path: '/redux',
        Component: Redux,
      },
      {
        path: "/logo",
        Component: Logo,
      },
      {
        path: "/form/:id",
        Component: Form,
      },
      {
        path: "/list",
        Component: List,
      },
      {
        path: "/class-component",
        Component: ParentClass,
      },
      {
        path: "/zustand",
        Component: Zustand,
      },
    ]
  },
  {
    path: '/account',
    Component: AccountLayout,
    children: [
      {
        path: '',
        Component: Account,
        children: [
          {
            path: '',
            Component: MounthAccount
          },
          {
            path: 'year',
            Component: YearAccount
          }
        ]
      },
      {
        path: 'record',
        Component: RecordAccount
      }
    ]
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "*",
    Component: NotFound,
  },
])

export default router