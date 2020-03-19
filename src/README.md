import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogin = () => {
  let flag = '';
  (localStorage.getItem("token") === null || localStorage.getItem("email") === null)
    ? flag = false : flag= true;
    return flag;
}

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      isLogin() ?
        <Redirect to="/dashboard" />
        : <Component {...props} />
    )} />
  );
};
export default PublicRoute;