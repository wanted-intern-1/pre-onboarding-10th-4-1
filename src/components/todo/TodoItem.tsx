import { ITodo } from "../../types/common";
import { useDeleteTodo } from "../../hooks";
import { FaSpinner, FaTrash } from "react-icons/fa";

type Props = {
  id: string;
  title: string;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
};

const TodoItem = ({ id, title, setTodos }: Props) => {
  const { isLoading, handleDeleteTodo } = useDeleteTodo();

  const handleClick = async () => {
    await handleDeleteTodo(id, setTodos);
  };

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleClick()}>
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
