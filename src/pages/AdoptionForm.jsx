import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoText from "@/components/InfoText";
import { fetchAnimalApi } from "../lib/api";
import AlertPopUp from "@/components/AlertPopUp";

const AdoptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // 描述所有表單欄位的設定檔
  const formFieldsConfig = [
    {
      name: "name",
      label: "姓名 *",
      type: "text",
      component: "input",
      validated: true,
    },
    {
      name: "email",
      label: "電子郵件 *",
      type: "email",
      component: "input",
      validated: true,
    },
    {
      name: "phone",
      label: "電話 *",
      type: "tel",
      component: "input",
      validated: true,
    },
    { name: "address", label: "地址", type: "text", component: "input" },
    { name: "occupation", label: "職業", type: "text", component: "input" },
    { name: "reason", label: "領養原因", component: "textarea", rows: 4 },
  ];

  const [adoptAnimal, setAdoptAnimal] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    reason: "",
  });

  // 使用物件來存放所有欄位的錯誤訊息
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const getAnimalData = async () => {
        try {
          const animalData = await fetchAnimalApi({ id }); // 儲存 API 回傳的資料
          setAdoptAnimal(animalData);
        } catch (err) {
          console.log(err);
        }
      };
      getAnimalData(); // 執行函數
    }
  }, [id]);

  const imgArr = adoptAnimal?.resources?.filter((res) => res.type === 1);
  const imgUrl = imgArr?.[0]?.url;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 驗證函式，接收表單資料，回傳一個包含所有錯誤訊息的物件
  const validate = (formData) => {
    const newErrors = {};

    // 規則 1: 姓名不能為空
    if (!formData.name) {
      newErrors.name = "姓名為必填欄位";
    }

    // 規則 2: Email 不能為空且格式需正確
    if (!formData.email) {
      newErrors.email = "電子郵件為必填欄位";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "電子郵件格式不正確";
    }

    // 規則 3: 電話不能為空
    if (!formData.phone) {
      newErrors.phone = "電話為必填欄位";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 執行完整的表單驗證
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    // 2. 檢查錯誤物件是否為空，若為空代表驗證通過
    if (Object.keys(validationErrors).length === 0) {
      // 將表單數據發送到後端
      console.log("表單驗證通過，提交:", {
        animalId: id,
        ...formData,
      });

      // 將表單數據發送到後端
      console.log("表單提交:", {
        animalId: id,
        ...formData,
      });

      // 顯示成功訊息並重定向
      setIsAlertOpen(true)
      
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    navigate(`/adoption/${id}`);
  } 

  return (
    <div className="adoption-wrap">
      <div className="img-bg">
        <img
          className="circle-image scale-[1.5] translate-x-[16rem] translate-y-[1.5rem]"
          src={imgUrl}
          alt={adoptAnimal.id}
        />
        <InfoText data={adoptAnimal} />
      </div>
      <div className="adoption-form-container">
        <h2>領養申請表單</h2>
        {/* 填寫表單 */}
        <form onSubmit={handleSubmit} className="adoption-form" noValidate>
          {formFieldsConfig.map((field) => (
            <div key={field.name}>
              <label> {field.label} </label>
              {/* 根據 component 類型決定渲染 input 或 textarea */}
              {field.component === "input" ? (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={field.validated ? handleBlur : undefined}
                />
              ) : (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onBlur={field.validated ? handleBlur : undefined}
                  rows={field.rows}
                />
              )}
              {/* 驗證對應的錯誤訊息 */}
              {field.validated && errors[field.name] && (
                <div className="error-text"> {errors[field.name]} </div>
              )}
            </div>
          ))}
          {/* 行動按鈕 */}
          <div>
            <button
              className="main-btn cancel-btn"
              type="button"
              onClick={() => navigate(`/info/${id}`)}
            >
              取消
            </button>
            <button className="main-btn" type="submit">
              提交申請
            </button>
          </div>
        </form>
      </div>
      {isAlertOpen && (
        <AlertPopUp
          message={"領養申請已提交！我們會盡快與您聯繫。"}
          toggleAlert={handleCloseAlert}
          isSecondBtn={false}
        />
      )}
    </div>
  );
};

export default AdoptionForm;
