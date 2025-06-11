import {useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import FlowerBtn from "./FlowerBtn";
import InfoText from './InfoText';
import AlertPopUp from './AlertPopUp'

const InfoCard = ({data}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comparedList, setComparedList] = useState([]);
  const [isAdd, setIsAdd] = useState(() => {
    // 直接從 localStorage 初始化 isAdd
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    return savedList.includes(id);
  });
  const [isHover, setIsHover] = useState(false);
  const [buttonText, setButtonText] = useState("加入考慮");
  const [buttonStyle, setButtonStyle] = useState("green-btn");
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  // 同步 comparedList 與 localStorage
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    setComparedList(savedList);
    setIsAdd(savedList.includes(id)); // 更新 isAdd
  }, [id]);

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
  };

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen)
  }

  const handleCompareClick = () => {
    const existingList = JSON.parse(localStorage.getItem("compareList")) || [];
    if (!existingList.includes(id)) {
      if(existingList.length > 4) {
        // return alert("考慮清單最多可選四個，目前已經四個囉~")
        setIsAlertOpen(true)
        return;
      }

      // 加入清單
      const updatedList = [...existingList, id];
      localStorage.setItem("compareList", JSON.stringify(updatedList));
      setComparedList(updatedList);
      setIsAdd(true);
    } else {
      // 從清單中移除
      const removedList = existingList.filter((item) => item !== id);
      localStorage.setItem("compareList", JSON.stringify(removedList));
      setComparedList(removedList);
      setIsAdd(false);
    }
  };

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("compareList")) || [];
    setComparedList(savedList);
  }, []);

  return (
    <div className="info-container">
      {data ? (
        <div className="wavy-background">
          <div className="info-content">
            <InfoText data={data} />
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
          {isAlertOpen && (
            <AlertPopUp
              message={"考慮清單最多可選四個，目前已經四個囉~"}
              handleAlertBtn={handleCompareListClick}
              labelOfBtn={"查看清單"}
              toggleAlert={toggleAlert}
            />
          )}
        </div>
      ) : (
        "資料載入中"
      )}
    </div>
  );
}

export default InfoCard