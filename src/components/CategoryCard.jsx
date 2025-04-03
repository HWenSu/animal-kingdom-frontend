
import { Link } from "react-router-dom"

const CategoryCard = ({animals}) => {
const uniqueAnimals = Object.values(
  animals.reduce((acc, item)=> {
    if(!acc[item.animal_kind]) {
      acc[item.animal_kind] = {
      animal_kind: item.animal_kind,
      album_files: item.album_file,
      }
    } 
    return acc
  },{})
)


return (
  <div>
    <h3 className="sub-title">誰能給我一個家？</h3>
    <ul className="category-card-container">
      {uniqueAnimals.length&&
      uniqueAnimals.map((item, index)=> (
        <Link key={`${item.animal_kind}_${index}`}>
        <li key={item.animal_kind}>
        <div className="img-container">
          <img
            className={item.animal_kind}
            src={item.album_files}
            alt={item.animal_kind}
          />
        </div>
          <h2>{item.animal_kind}</h2>
        </li>
        </Link>
      ))
      }
    </ul>
  </div>

  )
}

export default CategoryCard