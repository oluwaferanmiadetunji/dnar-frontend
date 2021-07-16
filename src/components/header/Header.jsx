import styles from './style.module.scss';

import { useHistory } from 'react-router-dom';

import { ROUTES } from 'utils/constants';

export default function Header() {
	const history = useHistory();

	const logout = (event) => {
		event.preventDefault();
		history.push(ROUTES.HOME);
	};

	return (
		<div className={styles.container}>
			<p className={styles.container__location}>Home</p>

			<button className={styles.container__sign_out} onClick={logout} type='button'>
				Sign Out
			</button>
		</div>
	);
}
