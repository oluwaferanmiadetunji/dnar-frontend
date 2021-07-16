import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { ROUTES } from 'utils/constants';
import AuthRoute from './AuthRoute';
import UnAuthRoute from './UnAuthRoute';

const Home = lazy(() => import('pages/home'));
const Dashboard = lazy(() => import('pages/dashboard'));

function Routes() {
	return (
		<Switch>
			<AuthRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
			<UnAuthRoute exact path={ROUTES.HOME} component={Home} />
			<Route render={() => <Redirect to={ROUTES.HOME} />} />
		</Switch>
	);
}

export default Routes;
