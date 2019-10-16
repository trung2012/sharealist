import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import ListPage from './components/list-page.component';

import SignUp from './components/signup.component';
import SignIn from './components/signin.component';
import Header from './components/header.component';

import './App.css';

const App = () => {

  return (
    <div className="App">
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route path='/lists' component={ListPage} />
          <Route path='/signup' component={SignUp} />
          <Redirect to='/' />
        </Switch>
      </>
    </div>
  );
}

export default App;
