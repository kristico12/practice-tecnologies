type PaginationTableProps = {
  setPage: (page: number) => void;
  currentPage: number;
  totalPage: number;
  pageIndex: number;
  pageOptions: number[];
}

export type { PaginationTableProps };