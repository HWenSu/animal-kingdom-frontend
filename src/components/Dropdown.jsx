import {useState} from 'react'

const Dropdown = ({ label, options, onChange}) => {
  const hasCityId = options.some(option => option.cityId)
  const filteredOptions = options.filter(option => option.cityId === 1)
  const [selectedCity, setSelectedCity] = useState(null)
  const handleCityChange = (e)=> {
   setSelectedCity(e.target.value)
  }

  // 處理選擇改變
  const handleChange = (e) => {
    const value = e.target.value
    if(value !== '選擇縣市'){
      onChange(value)
    }
  }

  return (
    <ul>
      {hasCityId ? (
        <li className="dropdown-container">
          <label>{label}</label>
          <div className="dropdown">
            {options && (
              <div>
                {/* 選擇來源城市 */}
                <select
                  className="custom-select"
                  onChange={handleCityChange}
                  value={selectedCity || ""}
                >
                  {options.map((city) => (
                    <option value={city.cityId} key={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {/* 選擇來源行政區 */}
                <select className="custom-select" onChange={handleChange}>
                  {options
                    .find((city) => city.cityId === parseInt(selectedCity))
                    ?.districts.map((district, index) => (
                      <option key={district + index}>{district}</option>
                    ))}
                </select>
              </div>
            )}
          </div>
        </li>
      ) : (
        <li className="dropdown-container">
          <label>{label}</label>
          <div className="dropdown">
            <select className="custom-select" onChange={handleChange}>
              {options &&
                options.map((option, index) => (
                  <option value={option} key={option + index}>
                    {option}
                  </option>
                ))}
            </select>
          </div>
        </li>
      )}
    </ul>
  );
};

export default Dropdown