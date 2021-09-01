import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';

import NewTodo from './newTodo';

describe('New Todo', () => {
  const todoHandler = jest.fn();
  it('Render initial', () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoText = screen.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = screen.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    expect(inputTodoText.value).toBe('');
    expect(inputTodoNumber.value).toBe('');
    expect(screen.getByLabelText(/Todo Text/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Todo Number/i)).toBeInTheDocument();
    expect(screen.getByTestId(/button-add-todo/i)).toBeInTheDocument();
  });
  it('Render values in inputs', () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoText = screen.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = screen.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    userEvent.type(inputTodoText, 'Todo 456'); // write Todo 456 in input
    expect(inputTodoText.value).toBe('Todo 456');
    userEvent.type(inputTodoNumber, '2'); // write 2 in input
    expect(inputTodoNumber.value).toBe('2');
    userEvent.type(inputTodoNumber, '789asdasd');
    expect(inputTodoNumber.value).toBe('');
  });
  it('errors validate [required]', async () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoText = screen.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = screen.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    const buttonAdd = screen.getByTestId(/button-add-todo/i);
    userEvent.type(inputTodoText, '');
    userEvent.type(inputTodoNumber, '');
    expect(inputTodoText.value).toBe('');
    expect(inputTodoNumber.value).toBe('');
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    const errorTodoText = screen.getByTestId(/todoText-error/i);
    const errorTodoNumber = screen.getByTestId(/todoNumber-error/i);
    expect(errorTodoText.textContent).toEqual('This is Required!');
    expect(errorTodoNumber.textContent).toEqual('This is Required!');
  });
  it('errors validate Input text', async () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoText = screen.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const buttonAdd = screen.getByTestId(/button-add-todo/i);
    userEvent.type(inputTodoText, 'un');
    expect(inputTodoText.value).toBe('un');
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    const errorTodoText = screen.getByTestId(/todoText-error/i);
    expect(errorTodoText.textContent).toEqual('Minimum 3 characteres');
  });
  it('errors validate Input Number', async () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoNumber = screen.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    const buttonAdd = screen.getByTestId(/button-add-todo/i);
    // validate minimun value
    userEvent.type(inputTodoNumber, '0');
    expect(inputTodoNumber.value).toBe('0');
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    const errorTodoNumber = screen.getByTestId(/todoNumber-error/i);
    expect(errorTodoNumber.textContent).toEqual('Minimum values is 1');
    // validate maximun value
    userEvent.clear(inputTodoNumber);
    userEvent.type(inputTodoNumber, '6');
    expect(inputTodoNumber.value).toBe('6');
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    const errorTodoNumber2 = screen.getByTestId(/todoNumber-error/i);
    expect(errorTodoNumber2.textContent).toEqual('Maximum values is 5');
  });
  it('execute func submit', async () => {
    const screen = render(<NewTodo todoAddHandler={todoHandler} />);
    const inputTodoText = screen.container.querySelector('input[name="todoText"]') as HTMLInputElement;
    const inputTodoNumber = screen.container.querySelector('input[name="todoNumber"]') as HTMLInputElement;
    const buttonAdd = screen.getByTestId(/button-add-todo/i);
    userEvent.type(inputTodoText, 'todo 1');
    userEvent.type(inputTodoNumber, '1');
    expect(inputTodoText.value).toBe('todo 1');
    expect(inputTodoNumber.value).toBe('1');
    userEvent.click(buttonAdd);
    await act(() => Promise.resolve());
    expect(todoHandler).toHaveBeenCalledTimes(1);
  });
});