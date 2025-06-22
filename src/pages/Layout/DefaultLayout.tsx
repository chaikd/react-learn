import { Link, Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <Link to="/comments">comment</Link>
      <br />
      <Link to="/">cartList</Link>
    </>
  )
}