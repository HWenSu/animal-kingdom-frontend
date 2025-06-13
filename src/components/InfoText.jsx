import React from 'react'

const InfoText = ({data, isShow=false}) => {
  return (
    <div className="info-text-warp">
      <p>動物類型: {data.kind}</p>
      <p>動物性別: {data.sex}</p>
      <p>動物品種: {data.variety}</p>
      <p>動物體型: {data.bodytype}</p>
      <p>動物毛色: {data.colour}</p>
      <p>動物年紀: {data.age}</p>
      <p>收容所名稱: {data.shelter_name}</p>
      <p>收容所地址: {data.shelter_address} </p>
      <p>聯絡電話: {data.shelter_tel}</p>
      {isShow && <p>收容編號: {data.animal_subid}</p>}
      { isShow && <p>動物尋獲地: {data.animal_foundplace}</p>}
      { isShow && <p>動物狀態: {data.animal_status}</p>}
      { isShow && <p>
        開放認養時間: {data.animal_opendate}~{data.animal_closeddate}
      </p>}
      { isShow && <p>資料更新時間: {data.album_update}</p>}
    </div>
  );
}

export default InfoText