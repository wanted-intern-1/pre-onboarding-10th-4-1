import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { TodoAPI } from "../../api";
import { useFocus, useMutation } from "../../hooks";
import { ITodo } from "../../types/common";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const InputTodo = ({ setTodos }: Props) => {
  const [inputText, setInputText] = useState("");
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const [createTodo, { isLoading }] = useMutation(TodoAPI.create, {
    onSuccess: (data: ITodo) => {
      setTodos((prev) => [...prev, data]);
      setInputText("");
    },
    onError: (error) => {
      console.error(error);
      alert("Something went wrong.");
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed) {
        return alert("Please write something");
      }
      const newItem: Omit<ITodo, "id"> = { title: trimmed };
      createTodo(newItem);
    },
    [inputText, createTodo]
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
      />
      {!isLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
};

export default InputTodo;
