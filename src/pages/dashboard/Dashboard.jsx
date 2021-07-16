import styles from './style.module.scss';

import Layout from 'components/layout';

import { DEFAULT_IMAGE } from 'utils/constants';

import UpdateProfile from './components/UpdateProfile';

import { useSelector } from 'react-redux';

export default function Dashboard() {
	const { data } = useSelector((state) => state.user);
	const roles = useSelector((state) => state.roles);

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.container__image} />
				<div className={styles.container__user}>
					<UpdateProfile />
					<div className={styles.container__user__image}>
						<img src={DEFAULT_IMAGE} alt='user' />
					</div>
					<div className={styles.container__user__details}>
						<p className={styles.container__user__details__item}>
							Name: <span>{data?.first_name || data?.last_name ? `${data?.first_name} ${data?.last_name}` : 'Null'}</span>
						</p>

						<p className={styles.container__user__details__item}>
							Email: <span>{data?.email || 'Null'}</span>
						</p>

						<p className={styles.container__user__details__item}>
							Country: <span>{data?.country || 'Null'}</span>
						</p>
						<p className={styles.container__user__details__item}>
							Role: <span>{data?.role || 'Null'}</span>
						</p>
					</div>
					<div className={styles.container__user__details}>
						<p className={styles.container__user__details__item}>
							Number of Projects: <span>4</span>
						</p>

						<p className={styles.container__user__details__item}>
							Total Number of Projects Available: <span>20</span>
						</p>

						<p className={styles.container__user__details__item}>
							Total Number of Employees: <span>20</span>
						</p>

						<p className={styles.container__user__details__item}>
							Total Number of Roles: <span>{roles.length}</span>
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
}
