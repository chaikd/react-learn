import { NavBar } from "antd-mobile";
import { useNavigate } from "react-router";

export default function RecommendAccount() {
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  return (
    <>
      <NavBar className="shadow-md" back='返回' onBack={back}>
        添加记录
      </NavBar>
      <div>RecommendAccount</div>
    </>
  )
}