import { useState, useEffect } from "react";
import { fetchAnimalApi } from "../lib/api";
import ComparedTable from "@/components/ComparedTable";

const CompareList = () => {
  const [compareIdList, setComparedIdList] = useState([]);
  const [compareAnimalData, setCompareAnimalData] = useState([]);

  // 獲取比較的id清單
  useEffect(() => {
    const compareData = localStorage.getItem("compareList");
    setComparedIdList(JSON.parse(compareData));
  }, []);

  // 從id抓取相對應的資料
  useEffect(() => {
    const getAnimalData = async () => {
      if (compareIdList.length) {
        try {
          // 等待所有請求完成
          const promises = compareIdList.map(async (id) => {
            const result = await fetchAnimalApi({id});
            return result;
          });
          const allAnimalData = await Promise.all(promises);
          setCompareAnimalData(allAnimalData); // 直接設定為包含所有動物資料的陣列
        } catch (err) {
          console.error(err);
        }
      }
    };
    getAnimalData();
  }, [compareIdList]);


  return (
    <div className="compare-page-container">
      <div className="cards-table-wrap">
        <ComparedTable data={compareAnimalData} />
      </div>
    </div>
  );
};

export default CompareList;
