import { PaginationTableProps } from "./types";
import { createRef, useEffect } from "react";

const PaginationTable = ({
  setPage,
  currentPage,
  totalPage,
  pageIndex,
  pageOptions,
}: PaginationTableProps): React.ReactElement => {
  const inputPageRef = createRef<HTMLInputElement>();
  useEffect(() => {
    if (inputPageRef?.current?.value) {
      inputPageRef.current.value = `${currentPage}`;
    }
  }, [currentPage, inputPageRef]);
  return (
    <div
      className='w-full flex flex-wrap justify-start gap-x-2'
    >
      <button
        onClick={() => {
          setPage(1);
        }}
        disabled={currentPage === 1}
        className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100'
      >
        {'<<'}
      </button>
      <button
        onClick={() => {
          setPage(currentPage === 0 ? 0 : currentPage - 1);
        }}
        disabled={currentPage === 1}
        className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100'
      >
        prev
      </button>
      <button
        onClick={() => {
          setPage(currentPage + 1);
        }}
        disabled={currentPage === totalPage}
        className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100'
      >
        next
      </button>
      <button
        onClick={() => {
          setPage(totalPage);
        }}
        disabled={currentPage === totalPage}
        className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100'
      >
        {'>>'}
      </button>
      <span
        className='flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100'
      >
        Page{' '}
        <strong>
          {pageIndex} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span
        className='px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-100'
      >
        | Go to page:{' '}
        <input
          ref={inputPageRef}
          type="number"
          min="1"
          defaultValue={currentPage}
          max={totalPage}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const page = inputPageRef?.current?.value ? Number(inputPageRef?.current?.value) : 1;
              if (page <= pageOptions.length) setPage(page);
            }
          }}
          className='px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700'
        />
      </span>
    </div>
  )
};

export default PaginationTable;
