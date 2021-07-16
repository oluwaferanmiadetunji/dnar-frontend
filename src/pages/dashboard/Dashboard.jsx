import styles from './style.module.scss';

import Layout from 'components/layout';
// import UserHeader from './components/Header';
// import Details from './components/Details';

export default function Dashboard() {
	return (
		<Layout>
			<div className={styles.container}>
				Dashboard
				{/* <UserHeader />

				<Details /> */}
			</div>
		</Layout>
	);
}
