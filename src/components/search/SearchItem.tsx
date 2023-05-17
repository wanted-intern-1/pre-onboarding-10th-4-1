import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { styled } from "styled-components";
import useHover from "../../hooks/useHover";
import { theme } from "../../styles/theme";

type Props = {
  result: string;
  inputText: string;
};

const SearchItem = ({ result, inputText }: Props) => {
  const [hoverRef, isHoverd] = useHover<HTMLLIElement>();
  const [clickId, setClickId] = useState("");

  useEffect(() => {
    setClickId("");
  }, [isHoverd]);

  return (
    <S.TodoLine ref={hoverRef} onClick={() => setClickId(result)}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: "transparent",
        }}
        searchWords={[inputText]}
        textToHighlight={result}
      >
        {result}
      </Highlighter>
      {isHoverd && clickId !== result ? (
        <S.HoverNotice>hover</S.HoverNotice>
      ) : (
        ""
      )}
      {clickId === result ? <S.ClickNotice>click</S.ClickNotice> : ""}
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
