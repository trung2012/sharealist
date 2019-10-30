import React, { useContext, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ListPage from './components/list-page.component';

import SignUp from './components/signup.component';
import Header from './components/header.component';
import { Context } from './context/AuthContext';

import './App.css';
import HomePage from './components/homepage.component';

const App = () => {
  const { loadUser } = useContext(Context);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/lists' component={ListPage} />
          <Route path='/signup' component={SignUp} />
          <Redirect to='/' />
        </Switch>
      </>
    </div>
  );
}

export default App;
