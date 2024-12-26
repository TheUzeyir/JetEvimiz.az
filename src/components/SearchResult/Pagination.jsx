import React from "react";

const Pagination = ({ pageIndex, onPreviousPage, onNextPage, isNextDisabled }) => (
  <div className={style.pagination}>
    <button
      onClick={onPreviousPage}
      disabled={pageIndex === 0}
      className={style.paginationBtn}
    >
      Əvvəlki
    </button>
    <span>Səhifə {pageIndex + 1}</span>
    <button
      onClick={onNextPage}
      disabled={isNextDisabled}
      className={style.paginationBtn}
    >
      Növbəti
    </button>
  </div>
);

export default Pagination;
