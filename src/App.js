import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from 'components/loader';
import Routes from 'components/routes';

import store from 'store';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const persistor = persistStore(store);

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</Suspense>
	);
}

export default App;
