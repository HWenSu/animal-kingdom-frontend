import { useState, useEffect, useMemo } from "react";
import Dropdown from "../components/Dropdown";
import { fetchAnimalsEnumApi } from "../lib/api";
import { useFilter } from "@/context/FilterContext";

const Enum = ({ hiddenList }) => {
  const { filter, dispatch } = useFilter();
  const [enumData, setEnumData] = useState(null);
  const [kinds, setKinds] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedKindId, setSelectedKindId] = useState(null);

  const labelMap = {
    sex: "性別",
    age: "年齡",
    bodytype: "體型",
    colour: "毛色",
    variety: "品種",
    shelter_pkid: "收容所",
    areas_id: "地區",
    state: "狀態",
    kind: "物種",
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
      const { kind, ...conditions } = enumData;
      setKinds(kind);
      setConditions(conditions);
    }
  }, [enumData]);

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

  const visibleConditions = formattedConditions.filter(
    (condition) => !hiddenList?.includes(condition.key)
  );

  const isOtherKindsSelected = useMemo(() => {
    if (!filter.kind || showKinds.length === 0) return false;
    return !showKinds.some((kind) => kind.kind === filter.kind);
  }, [filter.kind, showKinds]);

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
      case "shelter_pkid":
        dispatch({ type: "SET_SHELTER", payload: value });
        break;
      case "variety":
        dispatch({ type: "SET_VARIETY", payload: value });
        break;
      case "areas_id":
        dispatch({ type: "SET_AREA", payload: value });
        break;
      case "state":
        dispatch({ type: "SET_STATE", payload: value });
        break;
      default:
        break;
    }
  };

  const filters = {
    kind: filter.kind,
    age: filter.age,
    bodytype: filter.bodytype,
    colour: filter.colour,
    sex: filter.sex,
    shelter_pkid: filter.shelter_pkid,
    variety: filter.variety,
    areas_id: filter.areas_id,
  };
  console.log("輸入條件:", filters);

  return (
    <div className="filter-form-container">
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
                  checked={filter.kind === kind.kind}
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
        {visibleConditions &&
          visibleConditions.map((condition) => {
            if (condition.key === "variety") {
              const filteredOptions = selectedKindId
                ? condition.options.filter(
                    (option) => option.kind_id.toString() === selectedKindId
                  )
                : ["暫無品種選擇"]; // 如果還沒選 kind，就顯示空選項
              return (
                <Dropdown
                  key={condition.key}
                  label={condition.label}
                  options={filteredOptions}
                  onChange={(value) => handleFilterChange("variety", value)}
                  value={filter[condition.key]}
                />
              );
            } else {
              return (
                <Dropdown
                  key={condition.key}
                  label={condition.label}
                  options={condition.options}
                  onChange={(value) => handleFilterChange(condition.key, value)}
                  value={filter[condition.key]}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Enum;
