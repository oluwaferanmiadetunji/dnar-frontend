import styles from 'pages/dashboard/style.module.scss';

import { SearchOutlined } from '@ant-design/icons';

import AddEmployee from './AddEmployee';
import Employees from './Employees';

export default function Details() {
	return (
		<div className={styles.container__details}>
			<div className={styles.container__details__header}>
				<div className={styles.container__details__header__links}>
					<p className={styles.container__details__header__links__item}>Employees</p>
					<p className={styles.container__details__header__links__item}>Projects</p>
				</div>

				<div className={styles.container__details__header__search}>
					<AddEmployee />

					<div className={styles.container__details__header__search__bar}>
						<input placeholder='Search Employee' className={styles.container__details__header__search__bar__input} />
						<SearchOutlined className={styles.container__details__header__search__bar__icon} />
					</div>
				</div>
			</div>

			<Employees />
		</div>
	);
}
