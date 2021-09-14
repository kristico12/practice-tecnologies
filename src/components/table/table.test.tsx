import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Column } from 'react-table';

import Table from './table';


type testRow = {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}
const titleList: Array<Column<testRow>> = [
  { Header: 'Title 1', accessor: 'column1' },
  { Header: 'Title 2', accessor: 'column2' },
  { Header: 'Title 3', accessor: 'column3' },
  { Header: 'Title 4', accessor: 'column4' },
];
const rowList: testRow[] = [
  { column1: 'row1col1', column2: 'row1col2', column3: 'row1col3', column4: 'row1col4' },
  { column1: 'row2col1', column2: 'row2col2', column3: 'row2col3', column4: 'row2col4' },
  { column1: 'row3col1', column2: 'row3col2', column3: 'row3col3', column4: 'row3col4' },
  { column1: 'row4col1', column2: 'row4col2', column3: 'row4col3', column4: 'row4col4' },
  { column1: 'row5col1', column2: 'row5col2', column3: 'row5col3', column4: 'row5col4' },
];

describe('Table Test', () => {
  it('initial render loading', () => {
    const setPage = jest.fn();
    const view = render(<Table
      columnsList={[]}
      rowsList={[]}
      loading={true}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const thead = view.container.querySelector('thead')!;
    expect(thead).toBeEmptyDOMElement();
    const tbodyLoading = view.getByTestId(/tbody-loading/i);
    expect(tbodyLoading).toBeInTheDocument();
    expect(tbodyLoading.querySelectorAll('tr').length).toEqual(1);
    const rowLoading = tbodyLoading.querySelector('tr')!;
    expect(rowLoading.querySelectorAll('td').length).toEqual(1);
    expect(view.getByTestId(/loading-container/i)).not.toBeEmptyDOMElement();
  });
  it('render header', () => {
    const setPage = jest.fn();
    const view = render(<Table
      columnsList={titleList}
      rowsList={[]}
      loading={true}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const thead = view.container.querySelector('thead')!;
    expect(thead).not.toBeEmptyDOMElement();
    expect(thead.querySelectorAll('tr').length).toEqual(1);
    const trTheadContainer = thead.querySelector('tr')!;
    expect(trTheadContainer.querySelectorAll('th').length).toEqual(titleList.length);
    const allTh = trTheadContainer.querySelectorAll('th');
    allTh.forEach((child, i) => {
      const text = child.querySelector('div')!.querySelector('span')!;
      expect(text.textContent).toBe(titleList[i].Header);
    });
  });
  it('render rows', () => {
    const setPage = jest.fn();
    const view = render(<Table
      columnsList={titleList}
      rowsList={rowList}
      loading={false}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const tBody = view.container.querySelector('tbody')!;
    const allTrBody = tBody.querySelectorAll('tr')!;
    expect(allTrBody.length).toEqual(5);
    allTrBody.forEach((child, i) => {
      const tdAll = child.querySelectorAll('td')!;
      const row = rowList[i];
      tdAll.forEach((childTd, j) => {
        const item = Object.keys(row)[j] as 'column1' | 'column2' | 'column3' | 'column4';
        expect(childTd.textContent).toBe(row[item]);
      });
    });
  });
  it('render check', () => {
    const setCheck = jest.fn();
    const setPage = jest.fn();
    const view = render(<Table
      columnsList={titleList}
      rowsList={rowList}
      loading={false}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
      isCheck
      onCheck={setCheck}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const tHead = view.container.querySelector('thead')!;
    const tBody = view.container.querySelector('tbody')!;
    const checkHead = tHead.querySelector('input[data-testid=checkTable]') as HTMLLabelElement;
    expect(checkHead).toBeTruthy();
    const allTr = tBody.querySelectorAll('tr')!;
    allTr.forEach((child) => {
      const checkBody = child.querySelector('input[data-testid=checkTable]') as HTMLLabelElement;
      expect(checkBody).toBeTruthy();
    });
  });
  it('validate all checkboxs', () => {
    const setCheck = jest.fn();
    const setPage = jest.fn();
    let numberOfChek = 0;
    const view = render(<Table
      columnsList={titleList}
      rowsList={rowList}
      loading={false}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
      isCheck
      onCheck={setCheck}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const allChekbox = view.getAllByTestId(/checkTable/i);
    const chekHead = allChekbox[0];
    userEvent.click(chekHead);
    numberOfChek += 1;
    expect(setCheck).toHaveBeenCalledTimes(numberOfChek);
    allChekbox.forEach((child, i) => {
      if (i % 2 === 0 && i !== 0) {
        userEvent.click(child);
        numberOfChek += 1;
      }
    });
    expect(setCheck).toHaveBeenCalledTimes(numberOfChek);
  });
  it('validate sort table', () => {
    const setPage = jest.fn();
    const setSort = jest.fn();
    const view = render(<Table
      columnsList={titleList}
      rowsList={rowList}
      loading={false}
      currentPage={1}
      totalPerPage={5}
      setPage={setPage}
      totalFilter={100}
      isSort
      onSort={setSort}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    userEvent.click(view.getAllByTestId(/tHeadTh/i)[0]);
    expect(view.getAllByTestId(/tHeadTh/i)[0].querySelector('div')!.querySelector('picture')!).toBeTruthy();
    userEvent.click(view.getAllByTestId(/tHeadTh/i)[1]);
    expect(view.getAllByTestId(/tHeadTh/i)[0].querySelector('div')!.querySelector('picture')!).not.toBeTruthy();
    expect(view.getAllByTestId(/tHeadTh/i)[1].querySelector('div')!.querySelector('picture')!).toBeTruthy();
    expect(setSort).toHaveBeenCalledTimes(2);
  });
  it('validate function setPage', () => {
    const setPage = jest.fn();
    const view = render(<Table
      columnsList={titleList}
      rowsList={rowList}
      loading={false}
      currentPage={1}
      totalPerPage={5}
      totalFilter={100}
      setPage={setPage}
    />);
    expect(view.container.querySelector('table')).toBeInTheDocument();
    const nextPage = view.getByText(/>>/i) as HTMLButtonElement;
    userEvent.click(nextPage);
    expect(setPage).toHaveBeenCalledTimes(1);
  });
});
