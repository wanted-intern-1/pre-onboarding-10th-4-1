import { ThemeProvider } from "styled-components";
import "./App.css";

import Main from "./pages/Main";
import { theme } from "./styles/theme";
import { TodoInputProvider } from "./context/TodoInputContext";
import { TodoActionProvider } from "./context/TodoActionContext";
import TodoProvider from "./context/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <TodoActionProvider>
        <TodoInputProvider>
          <ThemeProvider theme={theme}>
            <Main />
          </ThemeProvider>
        </TodoInputProvider>
      </TodoActionProvider>
    </TodoProvider>
  );
};

export default App;
