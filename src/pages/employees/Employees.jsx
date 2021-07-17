import styles from './style.module.scss';

import Layout from 'components/layout';

export default function Employees() {
	return (
		<Layout title='Employees'>
			<div className={styles.container}>Employees</div>
		</Layout>
	);
}
