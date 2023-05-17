import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { styled } from "styled-components";
import useHover from "../../hooks/useHover";
import { theme } from "../../styles/theme";
import { ITodo } from "../../types/common";

type Props = {
  todo: ITodo;
  inputText: string;
};

const SearchItem = ({ todo, inputText }: Props) => {
  const [hoverRef, isHoverd] = useHover<HTMLLIElement>();
  const [clickId, setClickId] = useState("");

  useEffect(() => {
    setClickId("");
  }, [isHoverd]);

  return (
    <S.TodoLine ref={hoverRef} onClick={() => setClickId(todo.id)}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={todo.title}
      >
        {todo.title}
      </Highlighter>
      {isHoverd && clickId !== todo.id ? (
        <S.HoverNotice>hover</S.HoverNotice>
      ) : (
        ""
      )}
      {clickId === todo.id ? <S.ClickNotice>click</S.ClickNotice> : ""}
    </S.TodoLine>
  );
};

const S = {
  TodoLine: styled.li`
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      border-radius: 3px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  HoverNotice: styled.div`
    color: #3211ff;
    font-size: 8px;
  `,
  ClickNotice: styled.div`
    color: #ff112e;
    font-size: 8px;
  `,
};

export default SearchItem;
