import { useCallback, useContext, useState } from "react";

import Btn from "./common/Btn";
import { TodoContext } from "../contexts/TodoContext";

type Props = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteTodo } = useContext(TodoContext);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button onClick={handleRemoveTodo}>
            <Btn icon="trash" />
          </button>
        ) : (
          <Btn icon="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
