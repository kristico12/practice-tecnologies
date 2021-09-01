import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoList from './todoList';
import { itemsAtrrProps } from './types';

describe('todoList', () => {
  const removeItem = jest.fn();
  it('Render initial', () => {
    const mockList: itemsAtrrProps[] = [];
    const screen = render(<TodoList handleDelete={removeItem} items={mockList} />);
    const listContainer = screen.container.querySelector('ul');
    expect(listContainer).toBeEmptyDOMElement();
  });
  it('Render data', () => {
    const mockList: itemsAtrrProps[] = [
      { id: Math.floor(Math.round(new Date().getTime() / 1000) * Math.random()).toString(), todoNumber: '1', todoText: 'text 1' },
      { id: Math.floor(Math.round(new Date().getTime() / 1000) * Math.random()).toString(), todoNumber: '2', todoText: 'text 2' },
      { id: Math.floor(Math.round(new Date().getTime() / 1000) * Math.random()).toString(), todoNumber: '3', todoText: 'text 3' },
    ];
    const screen = render(<TodoList handleDelete={removeItem} items={mockList} />);
    const listContainer = screen.container.querySelector('ul')!;
    const childListContainer = listContainer.querySelectorAll('li');
    expect(childListContainer.length).toBe(3);
    childListContainer.forEach((child, i) => {
      const validateInputText = child.querySelector('span:first-child');
      const validateInputNumber = child.querySelector('span:nth-child(2)');
      expect(validateInputText?.textContent).toBe(mockList[i].todoText);
      expect(validateInputNumber?.textContent).toBe(mockList[i].todoNumber);
    });
  });
});