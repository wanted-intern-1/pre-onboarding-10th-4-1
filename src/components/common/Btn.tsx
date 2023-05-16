import { FaPlusCircle, FaSpinner, FaTrash } from "react-icons/fa";

import { styled } from "styled-components";

type Props = {
  icon: "plus" | "spinner" | "trash";
};

const Btn = ({ icon }: Props) => {
  return (
    <>
      <S.cont>
        {icon === "plus" && <FaPlusCircle className="plus" />}
        {icon === "spinner" && <FaSpinner className="spinner" />}
        {icon === "trash" && <FaTrash className="trash" />}
      </S.cont>
    </>
  );
};

const S = {
  cont: styled.div`
    display: flex;
    align-items: center;

    .plus {
      color: darkcyan;
      font-size: 20px;
    }
    .trash {
      color: orangered;
      font-size: 16px;
    }
    .plus:hover,
    .trash:hover {
      opacity: 0.5;
    }
    .spinner {
      display: flex;
      font-size: 20px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};

export default Btn;
