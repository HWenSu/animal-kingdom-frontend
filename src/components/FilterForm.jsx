import { useReducer } from "react";
import { initialState, filterReducer } from "../utility/filterReducer";
import Dropdown from "./Dropdown";

const FilterForm = () => {
  // 品種假資料
  const species = [
    { show: true, speciesId: 1, name: "犬" },
    { show: true, speciesId: 2, name: "貓" },
    { show: false, speciesId: 3, name: "兔子" },
    { show: false, speciesId: 4, name: "烏龜" },
  ];
  // 其他篩選條件假資料
  const filterConditions = [
    {
      speciesId: null,
      label: "收容所縣市",
      options: ["選擇縣市", "北北基", "桃園", "新竹", "苗栗"],
    },
    {
      speciesId: null,
      label: "收容所",
      options: ["選擇收容所", "A", "B", "C", "D", "E"],
    },
    {
      speciesId: null,
      label: "動物性別",
      options: ["選擇性別", "男生", "女生"],
    },
    {
      speciesId: null,
      label: "入所年齡",
      options: ["選擇年齡", "1", "2", "3", "4"],
    },
    {
      speciesId: null,
      label: "來源行政區",
      options: [
        { cityId: 1, name: "台北市", districts: ["信義區", "大安區"] },
        { cityId: 2, name: "新北市", districts: ["中和區", "板橋區"] },
      ],
    },
    {
      speciesId: 1,
      label: "毛色",
      options: ["白底虎斑", "橘", "三花", "黑", "其他"],
    },
  ];

  // 引用 useReducer資料
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // 過濾其他種類的陣列
  const hiddenSpecies = species.filter((specie) => !specie.show);

  // 處理品種選擇
  const handleSpecieChange = (e) => {
    dispatch({ type: "SET_SPECIE", payload: e.target.value });
  };

  // 處理其他篩選條件
  const handleFilterChange = (label, value) => {
    switch (label) {
      case "收容所縣市":
        dispatch({ type: "SET_CITY", payload: value });
        break;
      case "收容所":
        dispatch({ type: "SET_SHELTER", payload: value });
        break;
      case "動物性別":
        dispatch({ type: "SET_GENDER", payload: value });
        break;
      case "入所年齡":
        dispatch({ type: "SET_AGE", payload: value });
        break;
      case "來源行政區":
        dispatch({ type: "SET_DISTRICT", payload: value });
        break;
      case "毛色":
        dispatch({ type: "SET_FUR_COLOR", payload: value });
        break;
      default:
        break;
    }
  }

  // 處理搜尋
  const handleSearch = () => {
    const filters = {
      specie: state.selectedSpecie,
      city: state.selectedCity,
      shelter: state.selectedShelter,
      gender: state.selectedGender,
      age: state.selectedAge,
      district: state.selectedDistrict,
      furColor: state.selectedFurColor,
    };
    console.log("篩選條件:", filters);
    // 假設有一個動物資料陣列 animals
    // const filteredData = animals.filter(animal => {
    //   return (
    //     (!filters.specie || animal.specie === filters.specie) &&
    //     (!filters.city || animal.city === filters.city) &&
    //     // 其他條件
    //   );
    // });
    return filters; // 回傳篩選條件或篩選後的資料
  };

  return (
    <div className="filter-form-container">
      {/* 背景 SVG */}
      <div className="filter-form-bg">
        <svg
          viewBox="0 0 768 327"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.7117 12.4264C65.0091 4.77418 54.3249 0.0302337 42.5218 0.0302342C19.0382 0.0302352 -3.8147e-06 18.7945 0 41.9402C0 53.9058 5.0968 64.7005 13.2593 72.3377C5.0968 79.9748 0 90.762 0 102.735C3.8147e-06 114.708 5.0968 125.496 13.2593 133.133C5.0968 140.755 3.8147e-06 151.542 3.8147e-06 163.515C3.8147e-06 175.488 5.0968 186.275 13.2593 193.913C5.0968 201.542 7.6294e-06 212.329 7.6294e-06 224.303C7.6294e-06 236.276 5.09681 247.063 13.2593 254.7C5.09681 262.33 7.6294e-06 273.117 1.14441e-05 285.09C1.14441e-05 308.236 19.0383 327 42.5218 327C52.4549 327 61.5754 323.638 68.8183 318.018C76.0534 323.638 85.1816 327 95.107 327C105.032 327 114.161 323.638 121.403 318.018C128.639 323.638 137.767 327 147.7 327C157.229 327 166.011 323.906 173.105 318.692C180.195 323.91 188.992 327 198.522 327C198.818 327 199.113 326.997 199.407 326.991C199.702 326.997 199.997 327 200.293 327C209.825 327 218.609 323.904 225.703 318.687C232.791 323.904 241.582 327 251.107 327C251.404 327 251.7 326.997 251.996 326.991C252.292 326.997 252.588 327 252.885 327C262.416 327 271.198 323.905 278.292 318.69C285.38 323.905 294.169 327 303.7 327C303.997 327 304.293 326.997 304.589 326.991C304.885 326.997 305.181 327 305.478 327C315.006 327 323.801 323.911 330.891 318.695C337.977 323.907 346.765 327 356.293 327C366.226 327 375.346 323.638 382.589 318.018C389.824 323.638 398.952 327 408.885 327C418.818 327 427.939 323.638 435.182 318.018C442.417 323.638 451.545 327 461.478 327C461.652 327 461.826 326.999 462 326.997C462.174 326.999 462.348 327 462.522 327C472.455 327 481.575 323.638 488.818 318.018C496.053 323.638 505.182 327 515.107 327C525.032 327 534.161 323.638 541.403 318.018C548.639 323.638 557.767 327 567.7 327C577.633 327 586.753 323.638 593.996 318.018C601.231 323.638 610.36 327 620.293 327C630.226 327 639.346 323.638 646.589 318.018C653.824 323.638 662.952 327 672.885 327C682.818 327 691.939 323.638 699.182 318.018C706.417 323.638 715.545 327 725.478 327C748.962 327 768 308.236 768 285.09C768 273.124 762.903 262.33 754.741 254.693C762.903 247.055 768 236.268 768 224.295C768 212.322 762.903 201.535 754.741 193.898C762.903 186.26 768 175.473 768 163.5C768 151.527 762.903 140.74 754.741 133.102C762.903 125.465 768 114.678 768 102.705C768 90.7318 762.903 79.9446 754.741 72.3074C762.903 64.6703 768 53.8831 768 41.9099C768 18.7643 748.962 -1.0265e-06 725.478 0C715.99 4.14755e-07 707.229 3.06695 700.155 8.24148C693.081 3.06695 684.321 1.79906e-06 674.832 2.21381e-06C665.344 2.62857e-06 656.583 3.06695 649.509 8.24148C642.435 3.06695 633.674 4.01287e-06 624.186 4.42762e-06C614.698 4.84237e-06 605.937 3.06696 598.863 8.24148C591.789 3.06696 583.028 6.22667e-06 573.54 6.64143e-06C564.052 7.05618e-06 555.291 3.06696 548.217 8.24149C541.143 3.06696 532.382 8.44048e-06 522.894 8.85524e-06C511.091 9.37117e-06 500.407 4.74396 492.704 12.3962L492.712 12.4264C485.173 4.9367 474.777 0.23305 463.272 0.0366359C462.677 0.0122923 462.079 -2.62734e-08 461.478 0C451.99 4.14755e-07 443.229 3.06695 436.155 8.24148C429.081 3.06695 420.321 1.79906e-06 410.832 2.21381e-06C401.344 2.62857e-06 392.583 3.06695 385.509 8.24148C378.435 3.06695 369.675 4.01287e-06 360.186 4.42762e-06C350.698 4.84237e-06 341.937 3.06696 334.863 8.24148C327.789 3.06696 319.028 6.22667e-06 309.54 6.64143e-06C308.859 6.67118e-06 308.183 0.0157881 307.51 0.0469953C306.837 0.015782 306.159 -2.97695e-08 305.478 0C296.878 3.75916e-07 288.876 2.51945 282.186 6.84404C275.496 2.51945 267.494 8.47932e-06 258.894 8.85524e-06C258.213 8.885e-06 257.536 0.0157943 256.863 0.0470145C256.19 0.0157911 255.513 2.18405e-06 254.832 2.21381e-06C245.344 2.62857e-06 236.583 3.06695 229.509 8.24148C222.435 3.06695 213.675 4.01287e-06 204.186 4.42762e-06C203.155 4.47267e-06 202.133 0.0361869 201.121 0.107322C200.261 0.0561775 199.395 0.0302341 198.522 0.0302342C190.273 0.0302345 182.573 2.34542 176.053 6.35244C169.525 2.32912 161.809 6.27999e-06 153.54 6.64143e-06C144.052 7.05618e-06 135.291 3.06696 128.217 8.24149C121.143 3.06696 112.382 8.44048e-06 102.894 8.85524e-06C91.0909 9.37117e-06 80.4067 4.74396 72.7041 12.3962L72.7117 12.4264Z"
            fill="#FBE3D7"
          />
        </svg>
      </div>
      {/* 品種篩選 */}
      <div className="filter-container">
        <ul className="category-list">
          {species.map(
            (specie) =>
              specie.show && (
                <li key={specie.name}>
                  <label>
                    <input
                      type="radio"
                      name="category"
                      value={specie.name}
                      onChange={handleSpecieChange}
                    />
                    {specie.name}
                  </label>
                </li>
              )
          )}
          {/* 其他品種下拉式選單 */}
          <label>
            <input type="radio" name="category" className="custom-radio" />
            其他品種
          </label>
          <select
            className="dropdown-container custom-select"
            onChange={handleSpecieChange}
          >
            {hiddenSpecies.map((hiddenSpecie) => (
              <option key={hiddenSpecie.name} value={hiddenSpecie.name}>
                {hiddenSpecie.name}
              </option>
            ))}
          </select>
        </ul>
        {/*  其他篩選條件 */}
        {filterConditions &&
          filterConditions.map((condition) => (
            <Dropdown
              key={condition.label}
              label={condition.label}
              options={condition.options}
              onChange={(value) => handleFilterChange(condition.label, value)}
            />
          ))}
      </div>
      {/* 搜尋按鈕 */}
      <button className="main-btn" onClick={handleSearch}>
        開始尋找
      </button>
    </div>
  );
}

export default FilterForm