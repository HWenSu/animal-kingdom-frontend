import { useReducer, useState, useEffect, useMemo } from "react";
import { useFilter } from "@/context/FilterContext";
import Dropdown from "./Dropdown";
import cookieBg from "../assets/cookieBg.svg";
import { fetchAnimalsEnumApi } from "../lib/api";
import Enum from "@/pages/Enum";

const FilterForm = ({ handleFilterSearch }) => {
  const { filter, dispatch } = useFilter();

  // 處理搜尋
  const handleSearch = () => {
    const filters = {
      kind: filter.kind,
      age: filter.age,
      bodytype: filter.bodytype,
      colour: filter.colour,
      sex: filter.sex,
      shelter_pkid: filter.shelters,
      variety: filter.varieties,
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
      <Enum hiddenList={["state"]} />
    </div>
  );
};

export default FilterForm;
