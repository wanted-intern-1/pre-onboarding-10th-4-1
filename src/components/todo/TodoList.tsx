import { useTodoListContext } from '../../contexts/TodoListProvider';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useTodoListContext();

  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
