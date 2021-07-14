import { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ROUTES } from 'utils/contants';

const Home = lazy(() => import('pages/home'));
const Dashboard = lazy(() => import('pages/dashboard'));

function App() {
	return (
		<div>
			<Switch>
				<Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
				<Route exact path={ROUTES.HOME} component={Home} />
			</Switch>
		</div>
	);
}

export default App;
