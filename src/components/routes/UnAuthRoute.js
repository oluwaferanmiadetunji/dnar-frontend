import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTES } from 'utils/constants';

const Unauthenticated = ({ component: Component, ...rest }) => {
	const isLogged = useSelector((state) => state.user);

	return <Route {...rest} render={(props) => (isLogged ? <Redirect to={ROUTES.DASHBOARD} /> : <Component {...props} />)} />;
};

Unauthenticated.propTypes = {
	component: PropTypes.any,
};

export default Unauthenticated;
