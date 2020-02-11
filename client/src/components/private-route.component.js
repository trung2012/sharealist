import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() => {
        if (state.token) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location }
            }}
          />);
      }}
    />
  );
}

export default PrivateRoute;