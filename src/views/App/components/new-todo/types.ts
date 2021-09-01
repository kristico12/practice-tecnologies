type InputsForms = {
  todoText: string,
  todoNumber: string,
};
type NewTodoProps = {
  todoAddHandler: (data: InputsForms) => void;
}

export type { InputsForms, NewTodoProps };