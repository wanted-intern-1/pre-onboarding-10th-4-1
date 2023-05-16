import { styled } from "styled-components";
import { highlight } from "../utils/highlight";
import { LoadingIcon } from "../assets";

interface Props {
  ref: React.RefObject<HTMLDivElement>;
  inputText: string;
  items: string[];
  isScrollBottom: boolean;
}

const DropdownList = ({ ref, inputText, items, isScrollBottom }: Props) => {
  if (!inputText) return null;
  return (
    <S.Dropdown ref={ref}>
      <S.DropdwonList>
        <S.DropdwonItem
          dangerouslySetInnerHTML={{
            __html: highlight(inputText, inputText),
          }}
        />
        {items.map((item) => {
          return (
            <S.DropdwonItem
              key={item}
              dangerouslySetInnerHTML={{
                __html: highlight(item, inputText),
              }}
            />
          );
        })}
      </S.DropdwonList>
      <S.DropdownSpinnerIcon
        className="spinner"
        src={LoadingIcon}
        alt="spinner"
        isVisible={isScrollBottom}
      />
    </S.Dropdown>
  );
};

export default DropdownList;

const S = {
  Dropdown: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 9px 4px;
    background: #ffffff;
    border: 1px solid #dedede;
    box-shadow: 0px 0px 1px rgba(50, 50, 50, 0.05),
      0px 2px 4px rgba(50, 50, 50, 0.1);
    border-radius: 5px;
    max-height: 164px;
    overflow-y: scroll;
  `,
  DropdwonList: styled.ul`
    width: 100%;
    list-style: none;
  `,
  DropdwonItem: styled.li`
    width: 100%;
    padding: 6px 10px;
    font-size: 14px;

    strong {
      font-weight: 400;
      color: #2bc9ba;
    }

    &:hover {
      background-color: #f2f2f2;
      border-radius: 3px;
    }

    &:active {
      background: #d5f4f1;
    }
  `,
  DropdownSpinnerIcon: styled.img<{ isVisible: boolean }>`
    height: 20px;
    display: ${(props) => (props.isVisible ? "flex" : "none")};
  `,
};
