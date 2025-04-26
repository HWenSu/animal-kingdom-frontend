// import {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
import AnimalDataFetcher from '../components/AnimalDataFetcher';
import ImageCarousel from '../components/ImageCarousel';
import InfoCard from '../components/InfoCard';
import VideoEmbed from '../components/VideoEmbed';

const AnimalPage = () => {
  // const { id } = useParams(); // 從路由中獲取id
  const videoData = [
    {
      url: "https://www.youtube.com/embed/DHfRfU3XUEo?si=OPgiTXw5bbFwvcEX",
      thumbnail: "https://img.youtube.com/vi/DHfRfU3XUEo/mqdefault.jpg",
    },
    {
      url: "https://www.youtube.com/embed/JxS5E-kZc2s?si=-F91aseMS4rJyvoV",
      thumbnail: "https://img.youtube.com/vi/JxS5E-kZc2s/mqdefault.jpg",
    },
  ];

  return (
    <div className="animal-page-container">
      <AnimalDataFetcher
        url={"/data/animalData.json"}
        fallback={"動物資料載入中"}
      >
        {(animal) => (
          <div className="content-wrapper">
            <div className="media-container">
              {/* 圖片輪播 */}
              <ImageCarousel
                images={
                  Array.isArray(animal.album_file)
                    ? animal.album_file
                    : [animal.album_file]
                }
              />
              {/*影片輪播  */}
              <VideoEmbed data={videoData} />
            </div>
            <InfoCard data={animal} />
          </div>
        )}
      </AnimalDataFetcher>
    </div>
  );
}

export default AnimalPage