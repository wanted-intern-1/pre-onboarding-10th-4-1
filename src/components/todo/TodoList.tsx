import { ITodo } from "../../types/common";
import TodoItem from "./TodoItem";

type Props = {
  todos: ITodo[];
  refetch: () => Promise<void>;
};

const TodoList = ({ todos, refetch }: Props) => {
  return todos?.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} refetch={refetch} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
