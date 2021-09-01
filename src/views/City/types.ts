import { SortingRule } from 'react-table';
import { CitysAttr } from "../../services/citys";

type citysFilterState = {
  order: SortingRule<CitysAttr>[];
  totalPerPage: number;
  offset: number;
  allNumbers: 1123;
  page: number;
}

type citysSelectedState = {
  index: number;
  isSelected: boolean;
}

export type { citysFilterState, citysSelectedState };