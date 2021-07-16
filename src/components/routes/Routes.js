import { lazy, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { ROUTES } from 'utils/constants';
import { makeGetRequest } from 'utils/api';

import { useDispatch } from 'react-redux';
import { setRoles } from 'store/roles.slice';

import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRoute';

const Home = lazy(() => import('pages/home'));
const Dashboard = lazy(() => import('pages/dashboard'));
const Projects = lazy(() => import('pages/projects'));
const Employees = lazy(() => import('pages/employees'));
const Roles = lazy(() => import('pages/roles'));

function Routes() {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const { data, error } = await makeGetRequest('/role');

			if (!error) {
				dispatch(setRoles(data.results));
			}
		})();
	}, []);

	return (
		<Switch>
			<AuthRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
			<AuthRoute exact path={ROUTES.PROJECTS} component={Projects} />
			<AuthRoute exact path={ROUTES.EMPLOYEES} component={Employees} />
			<AuthRoute exact path={ROUTES.ROLES} component={Roles} />
			<UnAuthRoute exact path={ROUTES.HOME} component={Home} />
			<Route render={() => <Redirect to={ROUTES.HOME} />} />
		</Switch>
	);
}

export default Routes;
