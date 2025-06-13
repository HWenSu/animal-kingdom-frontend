import { useState } from "react";
import { userAuthApi } from "../lib/api.js";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AlertPopUp from "./AlertPopUp.jsx";

export default function Register() {
  // 使用 context 中的 login 函式
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080";
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // 描述所有註冊欄位的設定檔
  const registerFieldsConfig = [
    {
      name: "email",
      label: "電子信箱 *",
      type: "email",
      placeholder: "請輸入您的電子郵件",
    },
    {
      name: "username",
      label: "登入帳號 *",
      type: "text",
      placeholder: "請設定您的登入帳號",
    },
  ];

  // 統一管理所有表單欄位的值
  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  // 存放客戶端驗證的錯誤訊息
  const [errors, setErrors] = useState({});
  // 存放從後端 API 傳回的錯誤訊息
  const [apiError, setApiError] = useState(null);

  // 處理所有欄位輸入的通用函式
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => (
      { ...prev, [name]: value }
    ))
  }

  // 客戶端驗證函式
  const validate = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = "電子郵件為必填";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }
    if (!formData.username) newErrors.username = "登入帳號為必填";

    return newErrors;
  }

  const handleBlur = (e) =>{
    // 執行驗證函式
    const newErrors = validate(formData);
    // 只更新當前欄位的錯誤狀態
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: newErrors[e.target.name],
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // 先執行客戶端驗證
    const validationErrors = validate()
    if(Object.keys(validationErrors).length > 0 ) {
      setErrors(validationErrors);

      return; // 如果有錯，就停止提交
    }
    setErrors({})

    try {
      const data = await userAuthApi({
        url: `${API_BASE_URL}/user/start-register`,
        body: {
          email: formData.email,
          username: formData.username,
        },
      });
      setIsSuccessAlertOpen(true);
      console.log("註冊成功" , data)
    } catch (error) {
      console.log(error);
        const errorMessage = error.response?.data?.error || "不成功";
        setApiError(errorMessage);
        setIsAlertOpen(true)
    }
  }

  const handleCloseSuccess = () =>{
    setIsSuccessAlertOpen(false)
    navigate("/verify")
  }

  console.log(apiError)

  return (
    <>
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
          驗證信箱
        </Button>
      </form>
      {isSuccessAlertOpen && (
        <AlertPopUp
          message={"驗證信已寄出，請檢查您的電子郵件。"}
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
