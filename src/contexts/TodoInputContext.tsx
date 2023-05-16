import React, { ReactNode, createContext, useState } from "react";

interface ITodoInput {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
}

interface Props {
  children: ReactNode;
}

export const TodoInputContext = createContext<ITodoInput>({
  inputText: "",
  setInputText: () => {},
});

export const TodoInputProvider = ({ children }: Props) => {
  const [inputText, setInputText] = useState("");
  return (
    <TodoInputContext.Provider value={{ inputText, setInputText }}>
      {children}
    </TodoInputContext.Provider>
  );
};
