import { useState } from "react";
import { userAuthApi } from "../lib/api.js";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AlertPopUp from "./AlertPopUp.jsx";

export default function Login() {
  // 使用 context 中的 login 函式
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // 存放客戶端驗證的錯誤訊息
  const [errors, setErrors] = useState({});
  // 存放從後端 API 傳回的錯誤訊息
  const [apiError, setApiError] = useState(null);

  const API_BASE_URL = "http://localhost:8080";

  // 描述所有註冊欄位的設定檔
  const loginFieldsConfig = [
    {
      name: "username",
      label: "登入帳號 *",
      type: "text",
    },
    {
      name: "password",
      label: "登入密碼 *",
      type: "text",
    },
  ];

  // 統一管理所有表單欄位的值
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 處理所有欄位輸入的通用函式
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 客戶端驗證函式
  const validate = () => {
    const newErrors = {};
    if (!formData.username) { newErrors.username = "登入帳號為必填" } 
    if (!formData.password) { newErrors.password = "登入密碼為必填"; } 
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
    setApiError(null); // 清除上一次的 API 錯誤

    // 執行客戶端驗證
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const data = await userAuthApi({
        url: `${API_BASE_URL}/user/login`,
        body: {
          username: formData.username,
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
  };

  const handleCloseSuccess = () => {
    setIsSuccessAlertOpen(false);
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form-wrap">
        {loginFieldsConfig.map((field) => (
          <div key={field.name} className="field-container">
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors[field.name] && (
              <p className="error-text col-start-2">{errors[field.name]}</p>
            )}
          </div>
        ))}
        <Button type="submit" className="main-btn green-btn">
          登入
        </Button>
      </form>
      {isSuccessAlertOpen && (
        <AlertPopUp
          message={"登入成功"}
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
    </>
  );
}
