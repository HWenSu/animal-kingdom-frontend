import cookieBg from "../assets/cookieBg.svg";
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import FlowerBtn from "./FlowerBtn";

const InfoCard = ({data}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comparedList, setComparedList] = useState([])
  const [isAdd, setIsAdd] = useState(comparedList.includes(id));
  const [isHover, setIsHover] = useState(false)
  const [buttonText, setButtonText] = useState("加入考慮");
  const [buttonStyle, setButtonStyle] = useState("green-btn");

  useEffect(() => {
  if (!isAdd) {
    setButtonText("加入考慮");
    setButtonStyle("blue-btn");
  } else if (isAdd && isHover) {
    const timeoutId = setTimeout(() => {
      setButtonText("不考慮了");
      setButtonStyle("cancel-btn");
    }, 1000);
    return () => clearTimeout(timeoutId); // 清除 timeout 避免 memory leak
  } else {
    setButtonText("已加入考慮");
    setButtonStyle("green-btn");
  }
}, [isAdd, isHover]);


  const handleAdoptClick = () => {
      navigate(`/adoption-form/${id}`);
    };

  const handleCompareListClick = () => {
      navigate(`/compare-list`);
  }

  const handleCompareClick = () => {
    const existingList = JSON.parse(localStorage.getItem("compareList")) || []
    if(!existingList.includes(id)) {
      // 加入清單
      const updatedList = [...existingList, id];
      localStorage.setItem("compareList", JSON.stringify(updatedList));
      setComparedList(updatedList);
      setIsAdd(true);
    } else {
      // 從清單中移除
      const removedList = existingList.filter(item => item !== id)
      localStorage.setItem("compareList", JSON.stringify(removedList));
      setComparedList(removedList)
      setIsAdd(false);
    }
  }

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    setComparedList(savedList);
  }, []);

  return (
    <div className="info-container">
      {data ? (
        <div className="wavy-background">
          <div className="info-content">
            <p>動物類型: {data.animal_kind}</p>
            <p>動物性別: {data.animal_sex}</p>
            <p>動物毛色: {data.animal_colour}</p>
            <p>動物年紀: {data.animal_age}</p>
            <p>收容所名稱: {data.animal_place}</p>
            <p>收容所地址: {data.shelter_address} </p>
            <p>聯絡電話: {data.shelter_tel}</p>
            <p>收容編號: {data.animal_subid}</p>
            <p>動物尋獲地: {data.animal_foundplace}</p>
            <p>動物狀態: {data.animal_status}</p>
            <p>
              開放認養時間: {data.animal_opendate}~{data.animal_closeddate}
            </p>
            <p>資料更新時間: {data.album_update}</p>
            <div onClick={handleCompareListClick}>
              <FlowerBtn text={"考慮清單"} />
            </div>
            <div className="info-card-btn-wrap">
              <button onClick={handleAdoptClick} className="main-btn">
                我要領養
              </button>
              <button
                onClick={handleCompareClick}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className={`main-btn ${buttonStyle}`}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        "資料載入中"
      )}
    </div>
  );
}

export default InfoCard