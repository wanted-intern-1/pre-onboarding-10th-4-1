import { SearchIcon } from "../asset/SearchIcon";
import { LoadingIcon } from "../asset/LoadingIcon";
import { FormEvent, useCallback, useEffect, useState, useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { TodoInputContext } from "../contexts/TodoInputContext";
import useFocus from "../hooks/useFocus";

const containerStyle: React.CSSProperties = {
  borderColor: "#9F9F9F",
  outline: "none",
};

const InputTodo = () => {
  const [onFocused, setOnFocused] = useState(false);
  const { createTodoItem, isLoading } = useContext(TodoContext);
  const { inputText, setInputText } = useContext(TodoInputContext);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        await createTodoItem(inputText);
        setInputText("");
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        setInputText("");
      }
    },
    [inputText, createTodoItem, setInputText]
  );

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      style={onFocused ? containerStyle : {}}
      onMouseOut={() => setOnFocused(false)}
    >
      <button className="input-submit" type="submit">
        <SearchIcon />
      </button>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          setOnFocused(true);
        }}
        disabled={isLoading}
        onClick={() => setOnFocused(true)}
        onFocus={() => setOnFocused(true)}
      />
      {isLoading && (
        <span className="spinner">
          <LoadingIcon />
        </span>
      )}
    </form>
  );
};

export default InputTodo;
