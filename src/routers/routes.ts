import { createBrowserRouter } from "react-router";
import Logo from "../pages/Logo";
import Form from '../pages/Form/index'
import List from "../pages/List";
import Comments from '../pages/Comments';
import Redux from "@/pages/Redux";
import Login from "@/pages/Login";
import CartList from '@/pages/CartList'
import DefaultLayout from "@/pages/Layout/DefaultLayout";
import NotFound from "@/pages/Layout/NotFound";
import AccountLayout from "@/pages/Layout/AccountLayout";
import Account from "@/pages/Account";
import MounthAccount from "@/pages/Account/Mounth";
import YearAccount from "@/pages/Account/Year";
import RecordAccount from "@/pages/Account/Record";

let router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    // element: <AuthGuard></DefaultLayout></AuthGuard>,
    children: [
      {
        index: true,
        Component: CartList
      },
      {
        path: "/comments",
        Component: Comments,
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
            // lazy: () => import("@/pages/Account/Mounth") as any,
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
  // {
  //   path: "/form",
  //   Component: Form,
  // },
  {
    path: "/list",
    Component: List,
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