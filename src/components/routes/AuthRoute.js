import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { ROUTES } from 'utils/constants';

const Authenticated = ({ component: Component, ...rest }) => {
	const isLogged = useSelector((state) => state.user);

	return <Route {...rest} render={(props) => (isLogged ? <Component {...props} /> : <Redirect to={ROUTES.HOME} />)} />;
};

Authenticated.propTypes = {
	component: PropTypes.any,
};

export default Authenticated;
