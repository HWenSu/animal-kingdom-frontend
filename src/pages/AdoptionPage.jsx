import { useState, useEffect } from "react"
import FilterForm from "../components/FilterForm"
import AnimalCards from "../components/AnimalCards"
import FlowerBtn from "../components/flowerBtn"

const AdoptionPage = () => {
  const [activeFilters, setActiveFilters] = useState(null);

  const handleFilterSearch = (filtersFromChild) => {
    setActiveFilters(filtersFromChild);
  };

  console.log("activeFilters", activeFilters);

  return (
    <div className="adoption-page-container">
      <FlowerBtn text={"篩選"} />
      <FilterForm handleFilterSearch={handleFilterSearch} />
      <AnimalCards searchData={activeFilters} />
    </div>
  );
}

export default AdoptionPage