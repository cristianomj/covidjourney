import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import api from 'api';

export const AuthDataContext = createContext(null);

const initialAuthData = JSON.parse(localStorage.getItem('auth')) || {};

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authData.user) {
      try {
        (async function getUser() {
          await api.getUser(authData.token);
        })();
      } catch (error) {
        onSignOut();
      }
    }
  }, []);

  const authRedirect = path => {
    setTimeout(function(){ dispatch(push(path)); }, 1000);
  };

  const onSignUp = () => {
    authRedirect('/signin');
  };

  const onSignOut = () => {
    localStorage.clear();
    setAuthData({});
    authRedirect('/signin');
  };

  const onSignIn = newAuthData => {
    localStorage.setItem('auth', JSON.stringify(newAuthData));
    setAuthData(newAuthData);
    authRedirect('/');
  };

  const authDataValue = useMemo(() => ({ ...authData, onSignUp, onSignIn, onSignOut }), [authData]);

  return (
    <AuthDataContext.Provider value={authDataValue} {...props} />
  );
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
