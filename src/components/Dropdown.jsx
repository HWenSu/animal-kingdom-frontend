
const Dropdown = ({ label, options, value, onChange }) => {
  // 安全檢查，確保 options 是有效的陣列
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  return (
    <li className="dropdown-container">
      <label>{label}</label>
      <div className="dropdown">
        <select
          className="custom-select"
          value={value || ""} 
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">— 請選擇 —</option>

          {options.map((option, index) => {
            
            if (typeof option === "object" && option !== null) {
              //物件的處理方式
              const displayValue = option.variety || option.name;
              return (
                <option key={option.id || index} value={option.id}>
                  {displayValue}
                </option>
              );
            }

            //字串的處理方式
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    </li>
  );
};

export default Dropdown;
