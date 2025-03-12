import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AnimalDataFetcher from '../components/AnimalDataFetcher';
import ImageCarousel from '../components/ImageCarousel';
import InfoCard from '../components/InfoCard';
import cookieBg from "../assets/cookieBg.svg";

const AnimalPage = () => {
  const { id } = useParams(); // 從路由中獲取id



  return (
    <div>
      <AnimalDataFetcher url={"/data/animalData.json"} fallback={"資料載入中"}>
        {(animal) =>(
          <>
            <InfoCard/>
            <ImageCarousel/>
          </>
        ) 
        }
      </AnimalDataFetcher>
    </div>
  );
}

export default AnimalPage