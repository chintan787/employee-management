/* import logo from './logo.svg'; */
import './App.css';
import Router from './Router';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import {ConfigureStore} from './Redux/ConfigureStore';


function App() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const store = ConfigureStore();
  console.log("BASE_URL",BASE_URL)
  return (
    <>
    {/* <AuthProvider> */}
      <Provider store={store} >
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>

    {/* </AuthProvider> */}
    </>
  );
}

export default App;
