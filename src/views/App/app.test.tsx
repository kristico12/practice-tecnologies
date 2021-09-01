import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { TodoForm } from './types';
import { sleep } from '../../utils/test/sleep';

describe('App', () => {
  it('Render initial', () => {
    const view = render(<App />);
    const inputTodoText = view.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = view.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    expect(inputTodoText.value).toBe('');
    expect(inputTodoNumber.value).toBe('');
    expect(view.getByTestId(/button-add-todo/i)).toBeInTheDocument();
    expect(view.container.querySelector('ul')).toBeEmptyDOMElement();
  });
  it('Execute add todo and visualizate in the list', async () => {
    const view = render(<App />);
    const mockInput = {
      inputTodoText: 'Todo 456',
      inputTodoNumber: '2',
    }
    const inputTodoText = view.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = view.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    const buttonAdd = view.getByTestId(/button-add-todo/i);
    userEvent.type(inputTodoText, mockInput.inputTodoText); // write Todo 456 in input
    userEvent.type(inputTodoNumber, mockInput.inputTodoNumber); // write 2 in input
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    const allLi = view.container.querySelectorAll('li');
    expect(allLi.length).toEqual(1);
    const validateInputText = allLi[0].querySelector('span:first-child');
    const validateInputNumber = allLi[0].querySelector('span:nth-child(2)');
    expect(validateInputText?.textContent).toEqual(mockInput.inputTodoText);
    expect(validateInputNumber?.textContent).toEqual(mockInput.inputTodoNumber);
  });
  it('delete one element', async () => {
    const view = render(<App />);
    const mockList: TodoForm[] = [
      { todoNumber: '1', todoText: 'text 1' },
      { todoNumber: '2', todoText: 'text 2' },
      { todoNumber: '3', todoText: 'text 3' },
    ];
    const inputTodoText = view.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = view.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    const buttonAdd = view.getByTestId(/button-add-todo/i);
    for (const input of mockList) {
      userEvent.type(inputTodoText, input.todoText);
      userEvent.type(inputTodoNumber, input.todoNumber);
      userEvent.click(buttonAdd);
      await act(() => Promise.resolve());
      await sleep(1000);
    }
    const allLi = view.container.querySelectorAll('li');
    expect(allLi.length).toEqual(3);
    // remove one child ----
    const buttonSecond = allLi[1].querySelector('button')!;
    userEvent.click(buttonSecond);
    await act(() => Promise.resolve());
    const allLi2 = view.container.querySelectorAll('li');
    expect(allLi2.length).toEqual(2);
    const mockList2 = [...mockList.filter((item) => item.todoText !== 'text 2')];
    allLi2.forEach((child, i) => {
      const validateInputText = child.querySelector('span:first-child');
      const validateInputNumber = child.querySelector('span:nth-child(2)');
      expect(validateInputText?.textContent).toBe(mockList2[i].todoText);
      expect(validateInputNumber?.textContent).toBe(mockList2[i].todoNumber);
    });
  });
});