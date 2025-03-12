import { useNavigate } from "react-router-dom"
import AnimalDataFetcher from "./AnimalDataFetcher"

const AnimalCards = () => {
  const navigate = useNavigate()

  return (
    <div>
      <AnimalDataFetcher
        url={"/data/animalShelterData.json"}
        fallback={"動物資料載入中"}
      >
        {(animals) => (
          <ul className="animal-cards-container">
            {animals &&
              animals.map((animal) => (
                <li
                  key={animal.animal_id}
                  className="animal-card"
                  onClick={() => {
                    navigate(`/adoption/${animal.animal_id}`);
                  }}
                >
                  {/* 動物照片 */}
                  <div className="animal-image-container">
                    <img src={animal.album_file} alt={animal.animal_variety} />
                  </div>
                  {/* 品種名稱 */}
                  <h2>{animal.shelter_name}</h2>
                  {/* 動物簡介 */}
                  <div className="animal-info-container">
                    <p>{animal.animal_kind}</p>
                    <p>{animal.shelter_address}</p>
                    <p>{animal.animal_age}</p>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </AnimalDataFetcher>
    </div>
  );
}

export default AnimalCards