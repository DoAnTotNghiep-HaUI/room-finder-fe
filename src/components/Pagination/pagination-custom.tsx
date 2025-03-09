import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationCustom: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  className = "",
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <div
          key={page}
          onClick={() => onPageChange(page)}
          className={`relative h-4 w-4 rounded-full transition-all duration-300 ${
            currentPage === page ? "border border-blue-500" : ""
          }`}
        >
          {currentPage === page ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
            </span>
          ) : (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-gray-200"></span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaginationCustom;
