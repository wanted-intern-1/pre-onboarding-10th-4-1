import { FaSpinner, FaTrash } from "react-icons/fa";
import { TodoContext } from "../contexts/TodoContext";
import { useState, useCallback, useContext, useEffect } from "react";

type Props = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTodoItem } = useContext(TodoContext);
  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodoItem(id);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [id, deleteTodoItem]);

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
