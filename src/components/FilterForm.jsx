import { useReducer } from "react";
import { initialState, filterReducer } from "../utility/filterReducer";
import Dropdown from "./Dropdown";
import cookieBg from "../assets/cookieBg.svg"

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
      <img src={cookieBg} />
        {/* 搜尋按鈕 */}
        <button className="main-btn search-btn" onClick={handleSearch}>
          開始尋找
        </button>
      </div>
      {/* 品種篩選 */}
      <div className="filter-container">
        <ul className="category-list">
          {species.map(
            (specie) =>
              specie.show && (
                <li key={specie.name}>
                  <label className="custom-radio">
                    <input
                      type="radio"
                      name="category"
                      value={specie.name}
                      onChange={handleSpecieChange}
                    />
                    <span className="radio-mark"></span>
                    {specie.name}
                  </label>
                </li>
              )
          )}
          {/* 其他品種下拉式選單 */}
          <label className="custom-radio">
            <input type="radio" name="category" />
            <span className="radio-mark"></span>
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
    </div>
  );
}

export default FilterForm