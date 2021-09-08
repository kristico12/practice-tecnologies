import {
  useTable, usePagination, HeaderGroup, useSortBy, useRowSelect, CellProps,
  HeaderProps
} from 'react-table';
import { Fragment, useMemo, useEffect, useRef } from 'react';
import { tableProps } from './types';
import PaginationTable from './components/paginationTable/paginationTable';
import useViewport from '../../hoocks/viewPort';
import { arrowDownIcon, arrowUpIcon } from '../../assets/icons';
import { v4 as uuidv4 } from 'uuid';
import LoadingTable from './components/loadingTable/loadingTable';
import CheckBoxTable from './components/checkBoxTable/checkBoxTable';

function Table<T extends object>({
  rowsList,
  columnsList,
  currentPage,
  totalFilter,
  totalPerPage,
  setPage,
  onSort,
  isSort = true,
  loading,
  onCheck,
  isCheck = false,
}: tableProps<T>): React.ReactElement {
  const { widthScreen } = useViewport();
  const dataRows = useMemo(() => rowsList, [rowsList]);
  const titles = useMemo(() => columnsList, [columnsList]);
  const didMountOnSort = useRef(false);
  const didMountOnCheck = useRef(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    state: { pageIndex, sortBy, selectedRowIds },
  } = useTable(
    {
      columns: titles, data: dataRows,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useControlledState: (state) => useMemo(() => ({ ...state, pageIndex: currentPage }), [state, currentPage]),
      initialState: { pageIndex: currentPage },
      manualPagination: true,
      pageCount: Math.ceil(totalFilter / totalPerPage),
      manualSortBy: true,
      disableSortBy: loading ? true : !isSort,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        ...(isCheck ? [
          {
            id: 'id-select',
            ...(widthScreen > 640 && {
              Header: ({ getToggleAllPageRowsSelectedProps }: HeaderProps<T>) => (
                <CheckBoxTable props={{ ...getToggleAllPageRowsSelectedProps() }} />
              )
            }),
            Cell: ({ row }: CellProps<T>) => (
              <CheckBoxTable props={{ ...row.getToggleRowSelectedProps() }} />
            )
          }
        ] : []),
        ...columns
      ]);

    }
  );

  useEffect(() => {
    if (didMountOnSort.current) {
      if (onSort) onSort(sortBy);
    } else {
      didMountOnSort.current = true;
    }
  }, [onSort, sortBy]);

  useEffect(() => {
    if (didMountOnCheck.current) {
      if (onCheck) onCheck(selectedRowIds);
    } else {
      didMountOnCheck.current = true;
    }
  }, [onCheck, selectedRowIds]);

  const renderTitles = (headerGroup: HeaderGroup<T>) => {
    const render = [];
    const baseTr = <tr
      {...headerGroup.getHeaderGroupProps()}
      className='mb-0 table-row'
    >
      {headerGroup.headers.map(column => (
        <th
          {...column.getHeaderProps(column.getSortByToggleProps())}
          className='py-8 px-4 uppercase tracking-widest text-xs font-black'
          data-testid="tHeadTh"
        >
          <div
            className='flex justify-evenly'
          >
            <span>{column.render('Header')}</span>
            {
              column.isSorted && (
                <picture
                  className='block w-5 h-5'
                >
                  <img
                    src={column.isSortedDesc ? arrowDownIcon : arrowUpIcon}
                    alt={column.isSortedDesc ? 'arrowDown' : 'arrowUp'}
                    className='w-full h-full'
                  />
                </picture>
              )
            }
          </div>
        </th>
      ))}
    </tr>;
    const baseMobileTr = <tr
      className='flex flex-col justify-around h-60'
    >
      {headerGroup.headers.map(column => (
        <th
          key={`${column.id}-${uuidv4()}`}
          className='uppercase tracking-widest text-xs font-black'
        >
          {column.render('Header')}
        </th>
      )
      )}
    </tr>;
    if (widthScreen <= 640) {
      for (let i = 0; i < page.length; i++) {
        render.push(baseMobileTr);
      }
    } else { render.push(baseTr); }
    return (
      <>
        {
          render.map(item => <Fragment key={uuidv4()}>{item}</Fragment>)
        }
      </>
    );
  }
  const renderBodyRows = () => (
    <tbody
      {...getTableBodyProps()}
      className='col-span-6 divide-y divide-gray-500 tablet:divide-y-0'
    >
      {
        page.length > 0 ?
          (
            page.map(row => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  className='flex flex-col justify-around items-center h-60 bg-table-gray150 tablet:text-center tablet:bg-transparent tablet:odd:bg-table-gray150 tablet:table-row tablet:h-auto'
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className='tablet:py-8'
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          )
          : (
            <tr
              className='flex justify-center items-center tablet:table-row'
            >
              <td
                colSpan={titles.length}
                className='py-3'
              >
                <div
                  className='flex justify-center items-center'
                >
                  <span
                    className='capitalize text-2xl antialiased tracking-tighter text-gray-400'
                  >not result...</span>
                </div>
              </td>
            </tr>
          )
      }
    </tbody>
  );
  return (
    <>
      <table
        {...getTableProps()}
        className='w-full grid grid-cols-12 border-collapse font-mukta shadow-table_thead bg-white overflow-hidden tablet:inline-table'
      >
        <thead
          className='col-span-6 shadow-table_thead divide-y divide-gray-500'
        >
          {headerGroups.map((headerGroup) => (
            <Fragment
              key={uuidv4()}
            >
              {
                renderTitles(headerGroup)
              }
            </Fragment>
          ))}
        </thead>
        {
          loading ?
            <tbody
              className='col-span-6'
              data-testid="tbody-loading"
            >
              <tr
                className='flex justify-center items-center tablet:table-row'
              >
                <td
                  colSpan={titles.length}
                >
                  <div
                    className='flex justify-center items-center'
                    data-testid="loading-container"
                  >
                    <LoadingTable />
                  </div>
                </td>
              </tr>
            </tbody>
            :
            renderBodyRows()
        }
      </table>
      <div
        className='my-4 w-full'
      >
        <PaginationTable
          setPage={setPage}
          currentPage={currentPage}
          totalPage={Math.ceil(totalFilter / totalPerPage)}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
        />
      </div>
    </>
  );
}

export default Table;
