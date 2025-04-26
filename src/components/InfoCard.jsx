import cookieBg from "../assets/cookieBg.svg";
import { useParams, useNavigate } from "react-router-dom";

const InfoCard = ({data}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAdoptClick = () => {
      navigate(`/adoption-form/${id}`);
    };

  return (
    <div className="info-container">
      {data ? (
        <div class="wavy-background">
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
            <button
              onClick={handleAdoptClick}
              className="main-btn"
            >
              我要領養
            </button>
          </div>
        </div>
      ) : (
        "資料載入中"
      )}
    </div>
  );
}

export default InfoCard