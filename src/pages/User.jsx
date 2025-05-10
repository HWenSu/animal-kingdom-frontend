import Login from "../components/Login.jsx"
import Register from "../components/Register.jsx"
import {useState} from "react"

const User = () => {
  const [showRegister, setShowRegister] = useState(false)

  const handleShowRegister = () => {
    setShowRegister(!showRegister)
  }

  return (
    <div className="login-page-container">
      {showRegister ? (
        <div>
          <Register />
          <div className="flex justify-center items-center">
            <p>已經註冊過了?</p>
            <button
              className="main-btn blue-btn scale-75"
              onClick={handleShowRegister}
            >
              返回登入
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Login />
          <div className="flex justify-center items-center">
            <p>還沒有帳號嗎?</p>
            <button
              className="main-btn blue-btn scale-75"
              onClick={handleShowRegister}
            >
              開始註冊
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default User