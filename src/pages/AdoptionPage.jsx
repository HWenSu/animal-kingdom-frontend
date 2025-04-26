import FilterForm from "../components/FilterForm"
import AnimalCards from "../components/AnimalCards"
import FlowerBtn from "../components/flowerBtn"

const AdoptionPage = () => {
  return (
    <div className="adoption-page-container">
      <FlowerBtn />
      <FilterForm />
      <AnimalCards />
    </div>
  );
}

export default AdoptionPage