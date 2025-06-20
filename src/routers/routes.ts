import { createBrowserRouter } from "react-router";
import Logo from "../pages/Logo";
import Form from '../pages/Form/index'
import List from "../pages/List";
import Comments from '../pages/Comments';
import Redux from "@/pages/Redux";
import Login from "@/pages/Login";
import CartList from '@/pages/CartList'

let router = createBrowserRouter([
  {
    path: '/',
    Component: Redux,
  },
  {
    path: '/cartList',
    Component: CartList,
  },
  {
    path: "/comments",
    Component: Comments,
  },
  {
    path: "/logo",
    Component: Logo,
  },
  {
    path: "/form",
    Component: Form,
  },
  {
    path: "/list",
    Component: List,
  },
  {
    path: "/login",
    Component: Login,
  },
])

export default router