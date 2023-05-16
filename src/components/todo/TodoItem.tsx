import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useState } from 'react';

import { ITodo } from '../../types/common';
import { deleteTodo } from '../../api/todo';
import { useTodoListDispatchContext } from '../../contexts/TodoListProvider';

type Props = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { onDeleteTodo } = useTodoListDispatchContext();

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await onDeleteTodo(id);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, onDeleteTodo]);

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
