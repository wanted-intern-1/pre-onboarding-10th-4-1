import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { useContext } from "react";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
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
