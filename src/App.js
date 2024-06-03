/* import logo from './logo.svg'; */
import './App.css';
import Routers from './Routers';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {ConfigureStore} from './Redux/ConfigureStore';
import { HashRouter } from "react-router-dom";

function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const store = ConfigureStore();
  return (
    <>
      <Provider store={store} >
        <ThemeProvider theme={theme}>
        {/* <HashRouter basename="/"> */}
          <Routers />
         {/* <HashRouter> */}
        </ThemeProvider>
      </Provider>

    </>
  );
}

export default App;
