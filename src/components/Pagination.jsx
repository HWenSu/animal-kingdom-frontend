import { useMemo } from "react";

export function usePagination({totalItems, currentPage, itemsPerPage, siblingCount=1}) {
  // 計算總頁數
  const totalPages = Math.ceil(totalItems/itemsPerPage)

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 5;

    //如果總頁數 <= 7，直接顯示所有頁碼
    if (totalPageNumbers >= totalPages) {
      //建立一個連號陣列 [1, 2, 3, 4, 5]
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    //如果總頁數 >= 7，顯示 [1] ... [n-1] [n] [n+1] ... [最後一頁]

    const Dots = "...";
    // 計算當前頁面的前後兩個值
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    //[1] [2] [3] [4] ... [最後一頁]
    if (!showLeftDots && showLeftDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.form({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, Dots, lastPageIndex];
    }

    //[1] ... [8] [9] [10] [最後一頁]
    if ((showLeftDots, !showRightDots)) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.form(
        { length: rightItemCount },
        (_, i) => i + 1
      );
      return [firstPageIndex, Dots, ...rightRange];
    }

    //	[1 ... 4 5 6 ... 10]
    if (showLeftDots && showRightDots) {
      const middleRange = Array.form(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, Dots, middleRange, Dots, lastPageIndex];
    }
  }, [totalItems, currentPage, itemsPerPage, siblingCount]);

  return {
    paginationRange,
    totalPages,
  };


}