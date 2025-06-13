import { useParams, useNavigate } from "react-router-dom";
import FlowerBtn from "./FlowerBtn";
import InfoText from './InfoText';
import CompareButton from './CompareButton';
// import AlertPopUp from './AlertPopUp'

const InfoCard = ({data}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAdoptClick = () => {
    navigate(`/adoption-form/${id}`);
  };

  const handleCompareListClick = () => {
    navigate(`/compare-list`);
  };

  return (
    <div className="info-container">
      {data ? (
        <div className="wavy-background">
          <div className="info-content">
            <InfoText data={data} isShow={true}/>
            <div onClick={handleCompareListClick}>
              <FlowerBtn text={"考慮清單"} />
            </div>
            <div className="info-card-btn-wrap">
              <button onClick={handleAdoptClick} className="main-btn">
                我要領養
              </button>
              <CompareButton id={id} />
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