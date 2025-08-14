import { useReducer, useState, useEffect, useMemo } from "react";
import { initialState, filterReducer } from "../utility/filterReducer";
import Dropdown from "./Dropdown";
import cookieBg from "../assets/cookieBg.svg";
import { fetchAnimalsEnumApi } from "../lib/api";
import Enum from "@/pages/Enum";

const FilterForm = ({ handleFilterSearch }) => {
  // 引用 useReducer資料
  const [state, dispatch] = useReducer(filterReducer, initialState);

  // 處理搜尋
  const handleSearch = () => {
    const filters = {
      kind: state.kind,
      age: state.age,
      bodytype: state.bodytype,
      colour: state.colour,
      sex: state.sex,
      shelter_pkid: state.shelters,
      variety: state.varieties,
    };
    console.log("篩選條件:", filters);
    if (handleFilterSearch) {
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
      <Enum />
    </div>
  );
};

export default FilterForm;
