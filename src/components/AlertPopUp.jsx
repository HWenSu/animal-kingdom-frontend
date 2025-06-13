
const AlertPopUp = ({
  message,
  handleAlertBtn,
  labelOfBtn,
  toggleAlert,
  isSecondBtn=true,
}) => {
  return (
    <div className="alert-overlay">
      <div className="alert-popup-container">
        <p>{message}</p>
        <div className="alert-btn-container">
          <button className="main-btn green-btn" onClick={toggleAlert}>
            我知道了
          </button>
          {isSecondBtn && (
            <button className="main-btn cancel-btn" onClick={handleAlertBtn}>
              {labelOfBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertPopUp