import styled from "styled-components";

type Props = {
  title: string;
};
const Header = ({ title }: Props) => {
  return (
    <S.Header>
      <S.Title>{title}</S.Title>
    </S.Header>
  );
};

export default Header;

const S = {
  Header: styled.header`
    padding: 20px 0;
    line-height: 1.5em;
  `,
  Title: styled.h1`
    font-size: 6rem;
    font-weight: 600;
    margin-bottom: 2rem;
    line-height: 1em;
    color: #ececec;
    text-align: center;
  `,
};
