import AnimalDataFetcher from "./AnimalDataFetcher"

const AnimalCards = () => {
  return (
    <div>
      <AnimalDataFetcher  url={''} fallback={'動物資料載入中'}>
        {
         (animals) => (
          <ul className="animal-cards-container">
            {animals&& 
            animals.map((animal)=> (
              <li key={animal.animal_id} className="animal-card">
                {/* 動物照片 */}
                <div className="animal-image-container">
                  <img src={animal.album_file} alt={animal.animal_variety} />
                </div>
                {/* 品種名稱 */}
                <h2>{animal.animal_variety}</h2>
                {/* 動物簡介 */}
                <div className="animal-info-container">
                  <p>{animal.shelter_name}</p>
                  <p>{animal.animal_remark}</p>
                  <p>{animal.animal_age}</p>
                </div>
              </li>
            ))}
          </ul>
        )
        }
      </AnimalDataFetcher>
    </div>
  )
}

export default AnimalCards