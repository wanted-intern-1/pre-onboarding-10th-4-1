import { ThemeProvider } from 'styled-components';
import './App.css';

import Main from './pages/Main';
import { theme } from './styles/theme';
import InputProvider from './contexts/InputProvider';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <InputProvider>
        <Main />
      </InputProvider>
    </ThemeProvider>
  );
};

export default App;
