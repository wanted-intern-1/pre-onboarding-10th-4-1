import { useCallback } from "react";
import { FaSpinner, FaTrash } from "react-icons/fa";

import { TodoAPI } from "../../api";
import { useMutation } from "../../hooks";

type Props = {
  id: string;
  title: string;
  refetch: () => Promise<void>;
};

const TodoItem = ({ id, title, refetch }: Props) => {
  const [removeTodo, { isLoading }] = useMutation(TodoAPI.remove, {
    onSuccess: () => refetch(),
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
