import { Column, SortingRule, IdType } from 'react-table';

type tableProps<T extends object> = {
  loading: boolean;
  rowsList: T[];
  columnsList: Array<Column<T>>;
  currentPage: number;
  totalFilter: number;
  totalPerPage: number;
  setPage: (page: number) => void;
  onSort?: (sortBy: SortingRule<T>[]) => void;
  isSort?: boolean;
  onCheck?: (check: Record<IdType<T>, boolean>) => void;
  isCheck?: boolean;
}

export type { tableProps };