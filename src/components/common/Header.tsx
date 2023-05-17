import styled from 'styled-components';

const Header = () => {
  return (
    <S.Header>
      <S.Title>Toodos</S.Title>
    </S.Header>
  );
};

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

export default Header;
