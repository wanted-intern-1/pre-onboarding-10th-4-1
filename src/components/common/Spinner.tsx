import React from "react";
import { keyframes, styled } from "styled-components";
import SpinnberSvg from "../../assets/SpinnerSvg";

const Spinner = () => {
  return (
    <S.Rotate>
      <S.SpinnerIcon />
    </S.Rotate>
  );
};

const rotate = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;
const S = {
  SpinnerIcon: styled(SpinnberSvg)``,
  Rotate: styled.div`
    animation: ${rotate} 2s linear infinite;
  `,
};

export default Spinner;
