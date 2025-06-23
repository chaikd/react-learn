import { Link, Outlet } from "react-router";
import AuthGuard from "@/components/AuthGuard";

export default function DefaultLayout() {
  return (
    <>
      <AuthGuard>
        <Link to="/comments">comment</Link>
        <br />
        <Link to="/">cartList</Link>
      </AuthGuard>
    </>
  )
}