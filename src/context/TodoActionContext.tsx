import React, { createContext, useState } from "react";

interface ITodoAction {
  isClick: boolean;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  children: React.ReactNode;
};

export const TodoActionContex = createContext<ITodoAction>({
  isClick: false,
  setIsClick: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const TodoActionProvider = ({ children }: Props) => {
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <TodoActionContex.Provider
      value={{ isClick, setIsClick, isLoading, setIsLoading }}
    >
      {children}
    </TodoActionContex.Provider>
  );
};
