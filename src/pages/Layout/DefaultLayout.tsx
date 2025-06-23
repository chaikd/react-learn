import { Link, Outlet } from "react-router";
import AuthGuard from "@/components/AuthGuard";

export default function DefaultLayout() {
  return (
    <>
      <AuthGuard>
        <Link to="/">cartList</Link>
        <br />
        <Link to="/comments">comment</Link>
        <br />
        <Link to="/list">list</Link>
        <br />
        <Link to="/logo">logo</Link>
        <br />
        <Link to="/redux">redux</Link>
        <br />
        <Link to="/form/2">form</Link>
        <br />
        <Link to="/class-component">class-component</Link>
        <br />
        <Link to="/zustand">zustand</Link>
        <br />
        <Outlet></Outlet>
      </AuthGuard>
    </>
  )
}