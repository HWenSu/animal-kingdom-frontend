import { useAuth } from "@/context/AuthContext.jsx"
import { Link } from "react-router-dom"
import Login from "@/components/Login"
import Admin from "@/components/Admin"

const User = () => {
  const { token, logout } = useAuth()
  
  console.log(token)

  return (
    <div>
      {token ? (
        // 如果 token 存在 (已登入狀態)
        <>
          <Admin/>

        </>
      ) : (
        // 如果 token 為 null (未登入狀態)
        <div className="login-page-container">
          <Login />
          <div className="flex justify-center items-center">
            <p>還沒有帳號嗎?</p>
            <Link to="/create-account">
              <button className="main-btn blue-btn scale-75">開始註冊</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default User