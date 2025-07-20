import { useState, useEffect } from "react";
import { userAuthApi } from "../lib/api.js";
import { Button } from "@/components/ui/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import AlertPopUp from "../components/AlertPopUp.jsx";
import { useAuth } from "../context/AuthContext";
import { Check } from "lucide-react";


export default function Verify() {
   const [searchParams] = useSearchParams();
   const [token, setToken] = useState(null);

   const { login } = useAuth();

  // 使用 context 中的 login 函式
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080";
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  // 描述所有註冊欄位的設定檔
  const registerFieldsConfig = [
    {
      name: "password",
      label: "密碼 *",
      type: "password",
      placeholder: "請輸入您的密碼",
      minLength: 6
    },
    {
      name: "checkPassword",
      label: "確認密碼 *",
      type: "password",
      placeholder: "請再輸入一次密碼",
    },
  ];

  // 統一管理所有表單欄位的值
  const [formData, setFormData] = useState({
    password: "",
    checkPassword: ""
  });

  // 存放客戶端驗證的錯誤訊息
  const [errors, setErrors] = useState({});
  // 存放從後端 API 傳回的錯誤訊息
  const [apiError, setApiError] = useState(null);

  
useEffect(() => {
  // 使用 .get() 取得參數名稱 ('token')
  const urlToken = searchParams.get("token")
  if (urlToken) {
    setToken(urlToken);
  }
}, []); 

  // 處理所有欄位輸入的通用函式
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 客戶端驗證函式
  const validate = () => {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "密碼為必填";
    } else if ( formData.password.length < 6 ) {
      newErrors.password = "密碼長度至少為6個字元"
    }  

    if (formData.password !== formData.checkPassword ) {
      newErrors.password = "兩次輸入的密碼不一致";
    }

    return newErrors;
  };

  const handleBlur = (e) => {
    // 執行驗證函式
    const newErrors = validate(formData);
    // 只更新當前欄位的錯誤狀態
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: newErrors[e.target.name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 先執行客戶端驗證
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return; // 如果有錯，就停止提交
    }
    setErrors({});

    try {
      const data = await userAuthApi({
        url: `${API_BASE_URL}/user/complete-register`,
        body: {
          token,
          password: formData.password,
        },
      });
      setIsSuccessAlertOpen(true);
      setUserName(data.user.username)
      console.log("註冊成功", data);
    } catch (error) {
      setApiError(error.message || "註冊失敗，請稍後再試。");
      setIsAlertOpen(true);
    }
  };

  const handleCloseSuccess = async function() {
    setIsSuccessAlertOpen(false);
    
    try {
      const data = await userAuthApi({
        url: `${API_BASE_URL}/user/login`,
        body: {
          username: userName,
          password: formData.password,
        },
      });

      if(data && data.token) {
        login(data.token)
        setIsSuccessAlertOpen(true);
        console.log("登入成功", data);
      }

    } catch (error) {
      setApiError(error.message || "登入失敗，請稍後");
      setIsAlertOpen(true);
      console.log("登入失敗", error)
    }

    navigate("/");
  };

  return (
    <div>
      {!token ? (
        <div className="login-page-container">
          <p>請至信箱點擊驗證連結</p>
          <p>如有問題請與我們聯繫，動物王國客服信箱: animal_kingdom@gmail.com</p>
        </div>
      ) : (
        <div className="login-page-container">
          <form onSubmit={handleSubmit} className="login-form-wrap" noValidate>
            {registerFieldsConfig.map((field) => (
              <div key={field.name} className="field-container">
                <label>{field.label} :</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  minLength={field.minLength}
                />
                {errors[field.name] && (
                  <p className="error-text col-start-2">{errors[field.name]}</p>
                )}
              </div>
            ))}
            <Button type="submit" className="main-btn green-btn">
              註冊
            </Button>
          </form>
          {isSuccessAlertOpen && (
            <AlertPopUp
              message={"註冊成功，請返回登入頁面"}
              toggleAlert={handleCloseSuccess}
              isSecondBtn={false}
            />
          )}
          {isAlertOpen && (
            <AlertPopUp
              message={apiError}
              toggleAlert={() => setIsAlertOpen(false)}
              isSecondBtn={false}
            />
          )}
        </div>
      )}
    </div>
  );
}
