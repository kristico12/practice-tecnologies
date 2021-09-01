type TodoForm = {
  todoText: string;
  todoNumber: string;
}
type TodoId = {
  id: string;
};
type TodoState = TodoId & TodoForm;

export type { TodoState, TodoForm };
