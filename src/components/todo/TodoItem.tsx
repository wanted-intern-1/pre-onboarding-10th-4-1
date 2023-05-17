import { useCallback } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";

import { ITodo } from "../../types/common";
import { useMutation } from "../../hooks";
import { TodoAPI } from "../../api";

type Props = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoItem = ({ id, title, setTodos }: Props) => {
  const [removeTodo, { isLoading }] = useMutation(TodoAPI.remove, {
    onSuccess: () => {
      setTodos((prev) => prev.filter((item) => item.id !== id));
    },
    onError: (error) => {
      console.error(error);
      alert("Something went wrong.");
    },
  });

  const handleRemoveTodo = useCallback(() => {
    removeTodo(id);
  }, [id, removeTodo]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
