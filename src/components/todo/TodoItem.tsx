import { FaTrash } from "react-icons/fa";
import { useState, useContext } from "react";

import { TodoContext } from "../../context/TodoContext";
import Spinner from "../common/Spinner";

type Props = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteTodoItem } = useContext(TodoContext);

  const handleRemoveTodo = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTodoItem(id);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={() => handleRemoveTodo(id)}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
