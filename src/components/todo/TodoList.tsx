import { useContext } from "react";
import { ITodo } from "../../types/common";
import TodoItem from "./TodoItem";
import { TodoContext } from "../../context/TodoContext";

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
