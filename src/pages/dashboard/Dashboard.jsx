import styles from './style.module.scss';

import Header from 'components/header';
import UserHeader from './components/Header';
import Details from './components/Details';

export default function Dashboard() {
	return (
		<div className={styles.container}>
			<Header />

			<UserHeader />

			<Details />
		</div>
	);
}
