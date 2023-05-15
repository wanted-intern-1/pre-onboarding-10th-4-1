import { FaSpinner, FaTrash } from "react-icons/fa";

import { ITodo } from "../types/common";
import { deleteTodo } from "../api/todo";
import useAsync from "../hooks/useAsync";

type Props = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoItem = ({ id, title, setTodos }: Props) => {
  const { isLoading, callback } = useAsync({
    fn: async () => {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    },
    deps: [id, setTodos],
  });

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={callback}>
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
