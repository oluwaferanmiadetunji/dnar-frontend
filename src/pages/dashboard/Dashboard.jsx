import styles from './style.module.scss';

import Header from 'components/header';

export default function Dashboard() {
	return (
		<div className={styles.container}>
			<Header />
			Dashboard
		</div>
	);
}
