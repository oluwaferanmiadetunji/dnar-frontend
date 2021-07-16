import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
import './index.scss';

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root'),
);

reportWebVitals();
