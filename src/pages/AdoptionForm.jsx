import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdoptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    occupation: "",
    reason: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 基本表單驗證
    if (!formData.name || !formData.email || !formData.phone) {
      setError("請填寫所有必填欄位（姓名、電子郵件、電話）");
      return;
    }

    // 將表單數據發送到後端
    console.log("表單提交:", {
      animalId: id,
      ...formData,
    });

    // 顯示成功訊息並重定向
    alert("領養申請已提交！我們會盡快與您聯繫。");
    navigate(`/adoption/${id}`);
  };

  return (
    <div className="adoption-form-container">
      <h2>領養申請表單</h2>
      {error && <div className="">{error}</div>}

      <div onSubmit={handleSubmit} className="adoption-form">
        <div>
          <label>姓名 *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="">電子郵件 *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="">電話 *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="">地址</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>職業</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>領養原因</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div>
          <button
            className="main-btn cancel-btn"
            type="button"
            onClick={() => navigate(`/adoption/${id}`)}
          >
            取消
          </button>
          <button className="main-btn" onClick={handleSubmit}>
            提交申請
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionForm;
