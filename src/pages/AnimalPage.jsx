import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AnimalDataFetcher from '../components/AnimalDataFetcher';
import ImageCarousel from '../components/ImageCarousel';
import InfoCard from '../components/InfoCard';
import VideoEmbed from '../components/VideoEmbed';
import { fetchAnimalApi } from "../lib/api";

const AnimalPage = () => {
  const { id } = useParams(); // 從路由中獲取id
  const [animal, setAnimal] = useState([])
  
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


    useEffect(()=> {
      if (id) {
        const getAnimalData = async () => {
          try {
            const animalData = await fetchAnimalApi({id}); // 儲存 API 回傳的資料
            setAnimal(animalData);
          } catch (err) {
            console.log(err);
          }
        };
        getAnimalData(); // 執行函數
      }
    }
    , [id])

    console.log(animal);

    const imagesRes = animal?.resources?.filter(
      (resource) => resource.type === 1
    );
    console.log(imagesRes);
    const images = imagesRes?.map(image => image.url );
    const videos = animal?.resources?.filter((resource) => resource.type === 2);
    console.log(images, videos);


  return (
    <div className="animal-page-container">                
      <div className="content-wrapper">
        <div className="media-container">
          {/* 圖片輪播 */}
          <ImageCarousel images={images} />
          {/*影片輪播  */}
          <VideoEmbed data={videoData} />
        </div>
        <InfoCard data={animal} />
      </div>
    </div>
  );
}

export default AnimalPage