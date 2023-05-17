import { ThemeProvider } from 'styled-components';
import './App.css';

import Main from './pages/Main';
import { theme } from './styles/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
};

export default App;
