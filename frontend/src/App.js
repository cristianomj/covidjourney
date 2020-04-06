import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuthDataContext } from "components/AuthDataProvider";

import BlogPostPage from './BlogPost';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import UserInfo from './UserInfo';
import HomePage from './Home';

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
    <Route exact path="/post/:id" component={BlogPostPage} />
    <Route exact path="/" component={HomePage} />
    <PrivateRoute exact path="/details" compenent={UserInfo} />
  </Switch>
);

export default App;
