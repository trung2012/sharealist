import React, { useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Context } from '../context/AuthContext';

import logo from '../assets/logo.png';
import './header.styles.scss';

const Header = ({ history }) => {
  const { state, loadUser, signOut } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    loadUser(() => history.push('/lists'));
    // eslint-disable-next-line
  }, [])

  const handleSignOut = () => {
    signOut(() => history.push('/'));
  }

  return (
    <div className='header'>
      <div className='header-logo-container'>
        <img src={logo} alt='logo' className='logo' />
        <span className='logo-text'>ShareAList</span>
      </div>
      <div className='navigation-items-container'>
        {
          user &&
          <>
            <Link to='/lists' className='navigation-item navigate-to-list'>
              My Lists
            </Link>
            <div className='navigation-item navigation-sign-out' onClick={handleSignOut}>
              Sign Out
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default withRouter(Header);