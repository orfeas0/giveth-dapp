import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import User from 'models/User';
import Loader from './Loader';

const PrivateRoute = ({ path, exact, render, currentUser, isLoaded }) => {
  if (!isLoaded) return <Loader />;

  return currentUser ? <Route path={path} exact={exact} render={render} /> : <Redirect to="/" />;
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  isLoaded: PropTypes.bool,
  render: PropTypes.func,
  currentUser: PropTypes.instanceOf(User),
};

PrivateRoute.defaultProps = {
  path: '/',
  exact: false,
  isLoaded: false,
  render: () => {},
  currentUser: undefined,
};

export default PrivateRoute;
