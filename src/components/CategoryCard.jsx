import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {fetchAnimalsEnumApi} from '../lib/api'
import { fetchAnimalsApi } from "../lib/api";

const CategoryCard = () => {
  const [kinds, setKinds] = useState([]);

  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAnimalsEnumApi();
        // const animalData = await fetchAnimalsApi();
        // console.log(animalData)
        setKinds(data.kinds);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  console.log(kinds)
  
  // // 過濾出每一種 kind 的一個代表動物
  // const uniqueAnimals = Object.values(
  //   animals.reduce((acc, item) => {
  //     if (!acc[item.kind]) {
  //       acc[item.kind] = {
  //         kind: item.kind,
  //         image: item.resources?.[0]?.url || '',
  //       };
  //     }
  //     return acc;
  //   }, {})
  // );

  return (
    <div>
      <h3 className="sub-title">誰能給我一個家？</h3>
      <ul className="category-card-container">
        {kinds &&
          kinds.map((item, index) => (
            <Link key={`${item.kind}_${index}`}>
              <li key={item.kind}>
                <div className="img-container">
                  <img src={item.image} alt={item.kind} />
                </div>
                <h2>{item.kind}</h2>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
