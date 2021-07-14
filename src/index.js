import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from 'components/loader';

ReactDOM.render(
	<StrictMode>
		<Suspense fallback={<Loader />}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Suspense>
	</StrictMode>,
	document.getElementById('root'),
);

reportWebVitals();
