import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Button';

const Pagination = ({
  totalItems,
  itemsPerPage,
  setPage,
  page,
  setSize,
}: {
  totalItems: number;
  itemsPerPage: number;
  setPage: (value: number) => void;
  page: number;
  setSize: (value: number) => void;
}) => {
  const [menu, setMenu] = useState<boolean>(false);
  const pageSizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current?.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    const maxPageNumbersToShow = 5;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(page - halfMaxPageNumbersToShow, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (totalPages > maxPageNumbersToShow) {
      if (startPage === 1) {
        endPage = maxPageNumbersToShow;
      } else if (endPage === totalPages) {
        startPage = totalPages - maxPageNumbersToShow + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`${i === page ? ' bg-gray-200/20 ' : ''} `}>
          <button
            className="w-8 h-8 border border-gray-300 rounded-sm cursor-pointer hover:opacity-60 text-sm"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (totalPages > maxPageNumbersToShow) {
      if (startPage > 1) {
        pageNumbers.unshift(
          <li key="left-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(
          <li key="right-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="my-2 flex md:justify-center gap-8 md:gap-0 relative">
      <div className="relative md:absolute left-3 md:bottom-[.1rem] flex items-center gap-2">
        <p className="text-sm">Show:</p>
        <div
          onClick={() => setMenu(!menu)}
          className="bg-gray-200 rounded-md w-16 relative cursor-pointer flex items-center justify-between px-2 py-1"
        >
          <p className="text-center">{itemsPerPage}</p>
          <span>
            <ChevronDown height={14} width={14} />
          </span>
          {menu && (
            <div
              ref={wrapperRef}
              className="absolute bottom-9 left-0 rounded-t-md py-1 flex flex-col gap-1.5 w-full bg-white border border-gray-300 rounded-md max-h-[100px] overflow-y-auto hide-scrollbar"
            >
              {pageSizes.map((item, index) => (
                <p
                  className="cursor-pointer text-center hover:bg-gray-200/20"
                  key={index}
                  onClick={() => {
                    setSize!(item);
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      <ul className="flex items-center gap-4">
        <li className="hidden md:block text-sm">
          <Button
            className="!px-2 !py-2"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            <ChevronLeft />
          </Button>
        </li>
        {getPageNumbers()}
        <li className="hidden md:block text-sm">
          <Button
            className="!px-2 !py-2"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            <ChevronRight />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
