import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import { useEffect } from "react";

import { ITodo } from "../types/common";
import { createTodo } from "../api/todo";
import useFocus from "../hooks/useFocus";
import useForm from "../hooks/useForm";

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const InputTodo = ({ setTodos }: Props) => {
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const { values, isLoading, handleChange, handleSubmit } = useForm({
    initialValue: {
      search: "",
    },
    onSubmit: async ({ search }: { search: string }) => {
      const newItem: Omit<ITodo, "id"> = { title: search.trim() };
      const { data } = await createTodo(newItem);

      if (data) setTodos((prev) => [...prev, data as ITodo]);
    },
    validate: ({ search }: { search: string }) => {
      const error: any = {};

      const trimmed = search.trim();
      if (!trimmed) {
        alert("Please write something");
        error.search = "Error: input empty";
      }

      return error;
    },
  });

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        name="search"
        ref={ref}
        value={values.search}
        onChange={handleChange}
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
