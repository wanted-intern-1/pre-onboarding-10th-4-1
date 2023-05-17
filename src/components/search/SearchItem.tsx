import React, { FormEvent, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Highlighter from 'react-highlight-words';
import { theme } from '../../styles/theme';
import useHover from '../../hooks/useHover';

type Props = {
  todo: string;
  inputText: string;
  onSubmit: (e: FormEvent<Element>) => Promise<void>;
};

interface ILineStyle {
  ref: any;
  onClick: any;
  clickId: string;
}

const SearchItem = ({ onSubmit, todo, inputText }: Props) => {
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();
  const [clickId, setClickId] = useState('');

  const handleClick = (e: FormEvent) => {
    setClickId(todo);
    onSubmit(e);
  };

  useEffect(() => {
    setClickId('');
  }, [isHovered]);

  return (
    <S.TodoLine ref={hoverRef} onClick={handleClick} clickId={clickId}>
      <Highlighter
        highlightStyle={{
          color: theme.colors.green500,
          backgroundColor: 'transparent',
        }}
        searchWords={[inputText]}
        textToHighlight={todo}
      >
        {todo}
      </Highlighter>
      {isHovered && clickId !== todo ? (
        <S.HoverNotice>hover</S.HoverNotice>
      ) : (
        ''
      )}
      {clickId === todo ? <S.ClickNotice>click</S.ClickNotice> : ''}
    </S.TodoLine>
  );
};

const S = {
  TodoLine: styled.li<ILineStyle>`
    padding: 6px 12px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) =>
        !!props.clickId ? '' : theme.colors.neutral100};
      border-radius: 3px;
    }
    background-color: ${(props) => (!!props.clickId ? '#D5F4F1' : '')};
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
