import { useAuth } from "@/context/AuthContext.jsx";

const Admin = () => {
  const { token, logout } = useAuth();

  return (
    <div className="admin-container">
    會員專區
    <button onClick={()=>logout()}>
      登出
    </button>
    </div>
  )

};

export default Admin;
