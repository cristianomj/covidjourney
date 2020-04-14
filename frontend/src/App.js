import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuthDataContext } from "components/AuthDataProvider";

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import BlogPostPage from './BlogPost';
import ProfileAdminPage from './ProfileAdmin';
import HomePage from './Home';
import VerifyPage from './Verify';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuthDataContext();

  if (user) {
    return <Route {...options} component={component} />;
  }

  return <Redirect from={options.path} to="/signin" {...options} />;
};

const RedirectIfSignedIn = ({ component, ...options }) => {
  const { user } = useAuthDataContext();

  if (user) {
    return <Redirect from={options.path} to="/" {...options} />;
  }

  return <Route {...options} component={component} />;
};

const App = () => (
  <Switch>
    <RedirectIfSignedIn exact path="/signup" component={SignUpPage} />
    <RedirectIfSignedIn exact path="/signin" component={SignInPage} />
    <RedirectIfSignedIn exact path="/verify/:id/:token" component={VerifyPage} />
    <PrivateRoute exact path="/profile" component={ProfileAdminPage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/post/:id" component={BlogPostPage} />
  </Switch>
);

export default App;
