import { createContext, useContext, useState } from "react";

// 建立 Context 物件
const AuthContext = createContext()

// 提供全域登入狀態與方法  Provider 組件
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    //子元件可以透過 useContext 取得value值:
    // token-使用者目前的登入狀態, login/logout - 登入登出時呼叫的函數
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 提供自定義 hook，方便使用 context
export const useAuth = () => useContext(AuthContext);