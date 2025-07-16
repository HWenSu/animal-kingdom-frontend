import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAnimalsApi } from "../lib/api";
import { usePagination } from "./Pagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const AnimalCards = ({ searchData }) => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  console.log("searchData", searchData);

  // 分頁邏輯
  const { paginationRange } = usePagination({
    totalPages,
    totalItems,
    currentPage,
    itemsPerPage,
    siblingCount: 1,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 取得資料
  useEffect(() => {
    const getData = async () => {
        try {
          const data = await fetchAnimalsApi({ searchData, currentPage });
          setAnimals(data.data);
          setItemsPerPage(data.limit);
          setTotalItems(data.total);
          setTotalPages(data.totalPages);
        } catch (err) {
          console.error(err);
        }
    };
    getData();
  }, [searchData, currentPage]);

  // 當前頁資料
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentAnimals = animals.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ul className="animal-cards-container">
        {animals.map((animal) => {
          const images = animal.resources.filter(
            (resource) => resource.type === 1
          );
          const firstImage = images[0]?.url;
          return (
            <li
              key={animal.id}
              className="animal-card"
              onClick={() => navigate(`/adoption/${animal.id}`)}
            >
              <div className="animal-image-container">
                <img src={firstImage} alt={animal.variety} loading="lazy" />
              </div>
              <h2>{animal.shelter_name}</h2>
              <div className="animal-info-container">
                <p>{animal.kind}</p>
                <p>{animal.sex}</p>
                <p>{animal.shelter_address}</p>
                <p>{animal.age}</p>
              </div>
            </li>
          );
        })}
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
