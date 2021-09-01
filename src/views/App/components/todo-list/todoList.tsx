import { TodoListProps } from './types';
import styles from './styles';

const TodoList = ({
  items,
  handleDelete
}: TodoListProps): React.ReactElement => {
  return (
    <ul className={styles.Ul}>
      {
        items.map(item =>
          <li key={item.id} className={styles.Li}>
            <span>{item.todoText}</span>
            <span>{item.todoNumber}</span>
            <button
              onClick={() => handleDelete(item.id)}
              className={styles.Button}
            >
              DELETE
            </button>
          </li>)
      }
    </ul>
  );
};
export default TodoList;