import { useState } from 'react';
import { TodoState, TodoForm } from './types';
import TodoList from "./components/todo-list/todoList";
import NewTodo from './components/new-todo/newTodo';

const App = (): React.ReactElement => {
  const [todos, setTodos] = useState<TodoState[]>([]);
  const todoAddHandler = (data: TodoForm) => {
    setTodos([
      ...todos,
      {
        id: Math.round(new Date().getTime()/1000).toString(),
        todoText: data.todoText,
        todoNumber: data.todoNumber,
      }
    ]);
  };
  const todoRemoveHandler = (id: string) => {
    setTodos([...todos.filter((val) => val.id !== id)])
  };
  return (
    <>
      <NewTodo todoAddHandler={todoAddHandler} />
      <TodoList
        items={todos}
        handleDelete={todoRemoveHandler}
      />
    </>
  );
}

export default App;
