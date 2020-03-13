import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import axios from 'axios';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile);

let authenticated;
const token = localStorage.FBIdToken;
console.log(token)
if(token) {
  console.log("!!!!!")
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) {
    // token expire，就會導向 /login 畫面
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  // 設定 axios 的預設 baseURL (雖然在 package.json 內有設定 proxy，但 axios 在 login時，依然會從localhost/login)，因此要設定
  axios.defaults.baseURL = "https://asia-east2-socialape-1d0c1.cloudfunctions.net/api";
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
