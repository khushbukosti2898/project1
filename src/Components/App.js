import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './home';
import 'react-toastify/dist/ReactToastify.css';
import Login from './login';
import ClientContract from './ClientContract';
import PrivateRoute from '../PrivateRoute';
import PublicRoute from '../PublicRoute'
// import { Provider } from 'react-redux';
// import store from "./store";
import {
    BrowserRouter as Router,
    Switch,
    // Redirect,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (<Router>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Home} />
        <PrivateRoute extact path="/client-contact" component={ClientContract} />
      </Switch>
      {/* <Redirect to='/login' /> */}
    </Router>)
  }
}

export default App;
