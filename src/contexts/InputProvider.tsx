import { createContext, useContext, useState } from 'react';

const ERROR_MESSAGE_INPUT_CONTEXT = 'Error: InputContext';

type InputState = {
  inputText: string;
  handleInputChange: (value: string) => void;
};

const InputContext = createContext<InputState | null>(null);
export const useInputContext = () => {
  const state = useContext(InputContext);
  if (!state) throw new Error(ERROR_MESSAGE_INPUT_CONTEXT);

  return state;
};

const InputProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return (
    <InputContext.Provider value={{ inputText, handleInputChange }}>
      {children}
    </InputContext.Provider>
  );
};

export default InputProvider;
