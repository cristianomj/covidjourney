import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export const AuthDataContext = createContext(null);

const initialAuthData = {};

const AuthDataProvider = props => {
  const [authData, setAuthData] = useState(initialAuthData);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentAuthData = JSON.parse(localStorage.getItem('auth'));
    if (currentAuthData) {
      setAuthData(currentAuthData);
    }
  }, []);

  const onSignUp = () => {
    setTimeout(function(){ dispatch(push('/signin')); }, 1000);
  };

  const onSignOut = () => {
    localStorage.clear();
    setAuthData(initialAuthData);
    setTimeout(function(){ dispatch(push('/signin')); }, 1000);
  };

  const onSignIn = newAuthData => {
    localStorage.setItem('auth', JSON.stringify(newAuthData));
    setAuthData(newAuthData);
    setTimeout(function(){ dispatch(push('/')); }, 1000);
  };

  const authDataValue = useMemo(() => ({ ...authData, onSignUp, onSignIn, onSignOut }), [authData]);

  return <AuthDataContext.Provider value={authDataValue} {...props} />;
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
