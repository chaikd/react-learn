import { selectAuthToken } from "@/store/modules/authSlice"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router"

export default function AuthGuard({children}): React.ReactNode {
  let token = useSelector(selectAuthToken)
  const location = useLocation();
  if(!token) {
    return <Navigate to="/login" state={location} replace></Navigate>
  }
  return <>{children}</>
}