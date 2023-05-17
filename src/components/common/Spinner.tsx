import SpinnerSvg from '../../assets/SpinnerSvg';
import { styled } from 'styled-components';

type Props = {
  isLoading: boolean;
};

const Spinner = ({ isLoading }: Props) => {
  return (
    <S.SpinnerIcon isLoading={isLoading}>
      <SpinnerSvg />
    </S.SpinnerIcon>
  );
};

const S = {
  SpinnerIcon: styled.div<{ isLoading: boolean }>`
    display: flex;
    align-self: center;
    visibility: ${(props) => (props.isLoading ? 'visible' : 'hidden')};
  `,
};

export default Spinner;
