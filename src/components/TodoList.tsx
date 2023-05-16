import styled from "styled-components";
import { ITodo } from "../types/common";
import TodoItem from "./TodoItem";

type Props = {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoList = ({ todos, setTodos }: Props) => {
  return todos.length ? (
    <S.UnorderedList>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </S.UnorderedList>
  ) : (
    <S.EmptyListDiv className="empty-list">...</S.EmptyListDiv>
  );
};
export default TodoList;

const S = {
  UnorderedList: styled.ul`
    width: 100%;
  `,
  EmptyListDiv: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 2.5rem;
    letter-spacing: 1.5rem;
    margin-left: 0.75rem;
    color: #ececec;
  `,
};
