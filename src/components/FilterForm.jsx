import { useReducer, useState, useEffect, useMemo } from "react";
import { initialState, filterReducer } from "../utility/filterReducer";
import Dropdown from "./Dropdown";
import cookieBg from "../assets/cookieBg.svg"
import { fetchAnimalsEnumApi }  from '../lib/api'

const FilterForm = ({handleFilterSearch}) => {
  const [enumData, setEnumData] = useState(null);
  const [kinds, setKinds] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedKindId, setSelectedKindId] = useState(null)

  const labelMap = {
    sex: "性別",
    age: "年齡",
    bodytype: "體型",
    colour: "毛色",
    varieties: "品種",
    shelters: "收容所",
  };

  // 獲取 Enum 資料
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAnimalsEnumApi();
        setEnumData(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (enumData) {
      const { kinds, ...conditions } = enumData;
      setKinds(kinds);
      setConditions(conditions);
    }
  }, [enumData]);

  // 引用 useReducer資料
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const showKinds = useMemo(() => {
    if (Array.isArray(kinds)) {
      return kinds.slice(0, 2);
    }
    return [];
  }, [kinds]);

  const hiddenKinds = useMemo(() => {
    if (Array.isArray(kinds)) {
      return kinds.slice(2);
    }
    return [];
  }, [kinds]);

  const formattedConditions = useMemo(() => {
    return Object.entries(conditions).map(([key, value]) => ({
      key: key,
      label: labelMap[key] || key,
      options: value,
    }));
  }, [conditions]);

  console.log(formattedConditions)

  const isOtherKindsSelected = useMemo(() => {
    if (!state.kind || showKinds.length === 0) return false;
    return !showKinds.some((kind) => kind.kind === state.kind);
  }, [state.kind, showKinds]);


  // 處理動物種類選擇
  const handleKindChange = (e) => {
    dispatch({ type: "SET_KIND", payload: e.target.value });
    setSelectedKindId(e.target.dataset.id);
  };

  // 處理其他篩選條件
  const handleFilterChange = (label, value) => {
    switch (label) {
      case "age":
        dispatch({ type: "SET_AGE", payload: value });
        break;
      case "bodytype":
        dispatch({ type: "SET_BODY_TYPE", payload: value });
        break;
      case "colour":
        dispatch({ type: "SET_COLOUR", payload: value });
        break;
      case "sex":
        dispatch({ type: "SET_SEX", payload: value });
        break;
      case "shelters":
        dispatch({ type: "SET_SHELTER", payload: value });
        break;
      case "varieties":
        dispatch({ type: "SET_VARIETY", payload: value });
        break;
      default:
        break;
    }
  };

  // 處理搜尋
  const handleSearch = () => {
    const filters = {
      kind: state.kind,
      age: state.age,
      bodytype: state.bodytype,
      colour: state.colour,
      sex: state.sex,
      shelter_pkid: state.shelters,
      variety: state.varieties
    };
    console.log("篩選條件:", filters);
    if(handleFilterSearch){
      handleFilterSearch(filters);
    }
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
      <div className="filter-container">
        {/* 物種篩選 */}
        <ul className="category-list">
          {showKinds.map((kind) => (
            <li key={kind.id}>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="category"
                  value={kind.kind}
                  checked={state.kind === kind.kind}
                  onChange={handleKindChange}
                  data-id={kind.id} 
                />
                <span className="radio-mark"></span>
                {kind.kind}
              </label>
            </li>
          ))}
          {/* 其他品種下拉式選單 */}
          <label className="custom-radio">
            <input
              type="radio"
              name="category"
              checked={isOtherKindsSelected}
              readOnly
            />
            <span className="radio-mark"></span>
            其他品種
            <select
              className="dropdown-container custom-select"
              onChange={handleKindChange}
            >
              <option value="">— 請選擇 —</option>
              {hiddenKinds.map((hiddenKind) => (
                <option key={hiddenKind.id} value={hiddenKind.kind}>
                  {hiddenKind.kind}
                </option>
              ))}
            </select>
          </label>
        </ul>
        {/*  其他篩選條件 */}
        {formattedConditions &&
          formattedConditions.map((formattedCondition) => {
            if (formattedCondition.key === "varieties") {
              const filteredOptions = selectedKindId
              ? formattedCondition.options.filter(
                (option) => option.kind_id.toString() === selectedKindId
              )
              : ['暫無品種選擇']; // 如果還沒選 kind，就顯示空選項
              console.log("filteredOptions", filteredOptions);
              return (
                <Dropdown
                  key={formattedCondition.key}
                  label={formattedCondition.label}
                  options={filteredOptions}
                  onChange={(value) => handleFilterChange("varieties", value)}
                  value={state[formattedCondition.key]}
                />
              );
            } else {
              return (
                <Dropdown
                  key={formattedCondition.key}
                  label={formattedCondition.label}
                  options={formattedCondition.options}
                  onChange={(value) =>
                    handleFilterChange(formattedCondition.key, value)
                  }
                  value={state[formattedCondition.key]}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default FilterForm