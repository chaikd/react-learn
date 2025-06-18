import { createBrowserRouter } from "react-router";
import Logo from "../pages/Logo";
import Form from '../pages/Form/index'
import List from "../pages/List";

export default createBrowserRouter([
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
])