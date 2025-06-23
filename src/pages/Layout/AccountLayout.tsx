import { Outlet } from "react-router";
import '../Account/index.scss';
import AuthGuard from "@/components/AuthGuard";

export default function() {
  return (
    <AuthGuard>
      <div className="account-theme">
        <Outlet></Outlet>
      </div>
    </AuthGuard>
  )
}