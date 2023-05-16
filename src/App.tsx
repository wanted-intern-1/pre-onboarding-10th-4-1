import { ThemeProvider } from "styled-components";
import "./App.css";

import Main from "./pages/Main";
import { theme } from "./styles/theme";
import { TodoInputProvider } from "./context/TodoInputContext";
import { TodoActionProvider } from "./context/TodoActionContext";

const App = () => {
  return (
    <TodoActionProvider>
      <TodoInputProvider>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </TodoInputProvider>
    </TodoActionProvider>
  );
};

export default App;
