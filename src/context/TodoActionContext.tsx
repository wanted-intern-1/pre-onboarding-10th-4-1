import React, { createContext, useState } from "react";

interface ITodoAction {
  outSideClick: boolean;
  setOutSideClick: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  children: React.ReactNode;
};

export const TodoActionContex = createContext<ITodoAction>({
  outSideClick: false,
  setOutSideClick: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const TodoActionProvider = ({ children }: Props) => {
  const [outSideClick, setOutSideClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <TodoActionContex.Provider
      value={{ outSideClick, setOutSideClick, isLoading, setIsLoading }}
    >
      {children}
    </TodoActionContex.Provider>
  );
};
