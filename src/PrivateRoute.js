import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Components/layout/Header';
import NavBar from './Components/layout/Navbar'

const isLogin = () => {
    let flag = '';
    (localStorage.getItem("token") === null || localStorage.getItem("email") === null)
        ? flag = false : flag = true;
    return flag;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <>{console.log(isLogin())} <Header /><NavBar /><Component {...props} /></>
                : <>{console.log(isLogin())}<Redirect to="/login" /></>
        )} />
    );
};

export default PrivateRoute;