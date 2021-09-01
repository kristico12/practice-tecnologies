/* eslint-disable react-hooks/exhaustive-deps */
import { SortingRule, IdType } from 'react-table';
import { useState, useCallback } from "react";
import { useCitys, CitysAttr } from "../../services/citys";
import Table from "../../components/table/table";
import { titlesTablesCitys } from "../../utils/constants";
import { citysFilterState, citysSelectedState } from "./types";

const City = () => {
  const [filter, setFilter] = useState<citysFilterState>({
    totalPerPage: 10,
    offset: 0,
    allNumbers: 1123,
    page: 1,
    order: [],
  });
  const [, setSelected] = useState<citysSelectedState[]>([]);

  const { data, status } = useCitys(filter.totalPerPage, filter.offset, filter.order);

  const updatePage = (page: number) => {
    const localPage = page - 1;
    const localOffset = localPage * filter.totalPerPage;
    setFilter({ ...filter, page, offset: localOffset });
  }
  const handleSort = useCallback((sortBy: SortingRule<CitysAttr>[]) => {
    setFilter({ ...filter, order: sortBy });
  }, []);

  const handleCheck = useCallback((check: Record<IdType<CitysAttr>, boolean>) => {
    const localSelected: citysSelectedState[] = [];
    Object.keys(check).forEach((key) => {
      localSelected.push({ index: +key, isSelected: check[key] })
    });
    setSelected([...localSelected]);
  }, []);

  return (
    <div
      className='p-5'
    >
      <Table
        rowsList={data ?? []}
        columnsList={titlesTablesCitys}
        currentPage={filter.page}
        totalPerPage={filter.totalPerPage}
        totalFilter={filter.allNumbers}
        loading={status === "loading"}
        setPage={updatePage}
        onSort={handleSort}
        onCheck={handleCheck}
      />
    </div>
  );
}

export default City;
