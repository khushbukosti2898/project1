import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/home';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/login'
// import { Provider } from 'react-redux';
// import store from "./store";



import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const PrivateRoute = ({component,path, ...rest}) => {
    return (
        <Route render={props => (
            localStorage.getItem("email")!==null?
                <Route path={path} component={component} />
            : <Redirect to="/login" />
        )} />
    );
};


const routing = (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' render={()=>{
                if(localStorage.token)
                {
                    return<Login/>
                }else{
                    return<Redirect to="/dashbord"></Redirect>
                }
            }} />
            <Route path='/login' component={Login} />
            <PrivateRoute path="/dashboard" component={Home} />
        </Switch>
    </BrowserRouter>
);

// const globalStore = store({});

/* 
const Root = (globalStore) => (
    <Provider store={globalStore}>
      <BrowserRouter>
        <Switch>
            {<Route exact path='/' render={() => <Login />} />}
            <Route path='/login' component={Login} />
            <PrivateRoute path="/dashboard" component={Home} />
        </Switch>
    </BrowserRouter>
    </Provider>
  )
 */

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
