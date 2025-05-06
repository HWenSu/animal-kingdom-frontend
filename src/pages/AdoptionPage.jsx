import FilterForm from "../components/FilterForm"
import AnimalCards from "../components/AnimalCards"
import FlowerBtn from "../components/flowerBtn"

const AdoptionPage = () => {
  return (
    <div className="adoption-page-container">
      <FlowerBtn text={"篩選"} />
      <FilterForm />
      <AnimalCards />
    </div>
  );
}

export default AdoptionPage