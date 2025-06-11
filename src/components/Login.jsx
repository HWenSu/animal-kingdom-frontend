import { useState } from "react";
import { userAuthApi } from "../lib/api.js";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // 使用 context 中的 login 函式
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE_URL = "http://localhost:8080";

  const handleSubmit = (e) => {
    userAuthApi({
      e,
      url: `${API_BASE_URL}/user/login`,
      username,
      password,
      errMessage: "登入失敗",
      onSuccess: (data) => {
        login(data.token);
        alert("登入成功");
        navigate("/");
      },
    });
  };

  console.log("送出登入資料:", { username, password });

  return (
    <form onSubmit={handleSubmit} className="login-form-wrap">
      <p>帳號:</p>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>密碼:</p>
      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="main-btn">
        登入
      </Button>
    </form>
  );
}
