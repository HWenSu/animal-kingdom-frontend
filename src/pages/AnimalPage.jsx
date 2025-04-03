// import {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
import AnimalDataFetcher from '../components/AnimalDataFetcher';
import ImageCarousel from '../components/ImageCarousel';
import InfoCard from '../components/InfoCard';
import VideoEmbed from '../components/VideoEmbed';

const AnimalPage = () => {
  // const { id } = useParams(); // 從路由中獲取id

  return (
    <div  >
      <AnimalDataFetcher url={"/data/animalData.json"} fallback={"動物資料載入中"}>
        {(animal) =>(
          <div className='animal-page-container'>
            <div>
            <ImageCarousel images={Array.isArray(animal.album_file) ? animal.album_file : [animal.album_file]}/>
            <VideoEmbed videoUrl={"https://www.youtube.com/embed/DHfRfU3XUEo?si=OPgiTXw5bbFwvcEX"}/>
            </div>
            <InfoCard data={animal}/>
          </div>
        ) 
        }
      </AnimalDataFetcher>
    </div>
  );
}

export default AnimalPage