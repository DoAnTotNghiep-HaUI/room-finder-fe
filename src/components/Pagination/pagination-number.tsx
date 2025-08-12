import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className = "",
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Nút Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border px-3 py-1 disabled:opacity-50"
      >
        &laquo;
      </button>

      {/* Nút trang đầu nếu cần */}
      {currentPage > 3 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="rounded-md border px-3 py-1"
          >
            1
          </button>
          {currentPage > 4 && <span>...</span>}
        </>
      )}

      {/* Hiển thị các số trang */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md border px-3 py-1 ${
            currentPage === page ? "bg-blue-500 text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút trang cuối nếu cần */}
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span>...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="rounded-md border px-3 py-1"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border px-3 py-1 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
