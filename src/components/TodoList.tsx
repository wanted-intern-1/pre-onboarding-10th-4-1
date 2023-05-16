import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "./TodoItem";
import { styled } from "styled-components";
import { useContext } from "react";

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  return todos.length ? (
    <S.list>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </S.list>
  ) : (
    <div className="empty-list">...</div>
  );
};

const S = {
  list: styled.ul`
    z-index: 0;
  `,
};
export default TodoList;
