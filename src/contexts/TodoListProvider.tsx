import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { ITodo } from '../types/common';

const ERROR_MESSAGE = {
  INPUT_CONTEXT: 'Error: TodoContext',
  INPUT_DISPATCH_CONTEXT: 'Error: TodoDispatchContext',
};

const DISPATCH_CONDITION = {
  INIT: 'INIT_TODO_LIST',
  CREATE: 'CREATE_TODO',
  DELETE: 'DELETE_TODO',
};

type TodoListState = {
  todos: ITodo[];
};

type TodoListDispatch = {
  onCreateTodo: (newTodo: Omit<ITodo, 'id'>) => void;
  onDeleteTodo: (id: string) => void;
};

const TodoListContext = createContext<TodoListState | null>(null);
export const useTodoListContext = () => {
  const state = useContext(TodoListContext);
  if (!state) throw new Error(ERROR_MESSAGE.INPUT_CONTEXT);

  return state;
};

const TodoDispatchContext = createContext<TodoListDispatch | null>(null);
export const useTodoListDispatchContext = () => {
  const state = useContext(TodoDispatchContext);
  if (!state) throw new Error(ERROR_MESSAGE.INPUT_DISPATCH_CONTEXT);

  return state;
};

const reducer = (state = [], action: any) => {
  switch (action.type) {
    case DISPATCH_CONDITION.INIT: {
      return action.payload;
    }
    case DISPATCH_CONDITION.CREATE: {
      return [...state, action.payload];
    }
    case DISPATCH_CONDITION.DELETE: {
      const id = action.payload;
      return state.filter((todo: ITodo) => todo.id !== id);
    }
    default: {
      return state;
    }
  }
};

type Props = {
  children: React.ReactNode;
  initialState: ITodo[];
  handleCreateTodo: Function;
  handleDeleteTodo: Function;
};

const TodoListProvider = ({
  children,
  initialState = [],
  handleCreateTodo,
  handleDeleteTodo,
}: Props) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: DISPATCH_CONDITION.INIT, payload: initialState });
  }, [initialState]);

  const onCreateTodo = useCallback(
    async (newTodo: Omit<ITodo, 'id'>) => {
      const { data } = await handleCreateTodo(newTodo);
      dispatch({ type: DISPATCH_CONDITION.CREATE, payload: data });
    },
    [handleCreateTodo]
  );

  const onDeleteTodo = useCallback(
    async (id: string) => {
      await handleDeleteTodo(id);
      dispatch({ type: DISPATCH_CONDITION.DELETE, payload: id });
    },
    [handleDeleteTodo]
  );

  return (
    <TodoListContext.Provider value={{ todos }}>
      <TodoDispatchContext.Provider value={{ onCreateTodo, onDeleteTodo }}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
