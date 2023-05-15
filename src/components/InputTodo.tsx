import { FaPlusCircle, FaSpinner, FaSearch } from "react-icons/fa";
import { SearchIcon } from "../asset/SearchIcon";
import { LoadingIcon } from "../asset/LoadingIcon";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const InputTodo = ({ setTodos }: Props) => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem: Omit<ITodo, "id"> = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data as ITodo]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
        setIsLoading(false);
      }
    },
    [inputText, setTodos]
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <button className="input-submit" type="submit">
        <SearchIcon />
      </button>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      <span className="spinner">
        <LoadingIcon />
      </span>
    </form>
  );
};

export default InputTodo;
