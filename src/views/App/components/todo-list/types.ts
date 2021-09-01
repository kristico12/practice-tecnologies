type itemsAtrrProps = {
  id: string;
  todoText: string,
  todoNumber: string,
};

type TodoListProps = {
 items: itemsAtrrProps [];
 handleDelete: (id: string) => void;
};

export type { TodoListProps, itemsAtrrProps };
