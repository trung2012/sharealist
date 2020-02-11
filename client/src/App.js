import React, { useContext, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Lists from './components/lists.component';
import ListDetails from './components/list-details.component';

import SignUp from './components/signup.component';
import Header from './components/header.component';
import { Context } from './context/AuthContext';
import PrivateRoute from './components/private-route.component';

import './App.css';
import SignIn from './components/signin.component';

const App = () => {
  const { loadUser } = useContext(Context);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Header />
      <Switch>
        <PrivateRoute exact path='/'>
          <Lists />
        </PrivateRoute>
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path={`/:listId`} component={ListDetails} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
