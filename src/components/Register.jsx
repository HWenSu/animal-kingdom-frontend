import { useState } from "react";
import { userAuthApi } from "../lib/api.js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // 使用 context 中的 login 函式
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_BASE_URL = "http://localhost:8080";

  const handleSubmit = (e) => {
    userAuthApi({
      e,
      url: `${API_BASE_URL}/user/register`,
      username,
      password,
      errMessage: "註冊失敗",
      onSuccess: (data) => {
        alert(data.message);
        navigate("/user");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form-wrap">
      <p>帳號:</p>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="請輸入註冊帳號"
        required
      />
      <p>密碼:</p>
      <Input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        placeholder="密碼至少6個字元以上"
      />
      <Button type="submit" className="main-btn green-btn">
        註冊
      </Button>
    </form>
  );
}
