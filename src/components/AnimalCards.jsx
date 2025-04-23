import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "./Pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const AnimalCards = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 分頁邏輯
  const { paginationRange, totalPages } = usePagination({
    totalItems: animals.length,
    currentPage,
    itemsPerPage,
    siblingCount: 1,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 取得資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data/animalShelterData.json");
        const data = await res.json();
        setAnimals(data);
      } catch (err) {
        console.error("載入動物資料失敗", err);
      }
    };
    fetchData();
  }, []);

  // 當前頁資料
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnimals = animals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ul className="animal-cards-container">
        {currentAnimals.map((animal) => (
          <li
            key={animal.animal_id}
            className="animal-card"
            onClick={() => navigate(`/adoption/${animal.animal_id}`)}
          >
            <div className="animal-image-container">
              <img src={animal.album_file} alt={animal.animal_variety} />
            </div>
            <h2>{animal.shelter_name}</h2>
            <div className="animal-info-container">
              <p>{animal.animal_kind}</p>
              <p>{animal.shelter_address}</p>
              <p>{animal.animal_age}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* 分頁器 */}
      <Pagination className="pagination-wrap">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {paginationRange.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {page === "..." ? (
                <span className="px-2 text-muted-foreground">...</span>
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AnimalCards;
