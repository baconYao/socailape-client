import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const AuthRoute =({ component: Component, authenticated, ...rest }) => (
  /* 用來檢查 authenticated 是否為 true，若沒有則導回 "/"，有的話，則導向傳進來的 Component
   * component: Component => 被傳進來的 component
   */
  <Route 
    {...rest}
    render={(props) => authenticated === true ? <Redirect to="/" /> : <Component {...props} />}
  />
);

export default AuthRoute
