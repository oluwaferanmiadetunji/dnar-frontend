import { useState } from 'react';
import styles from 'pages/dashboard/style.module.scss';

import { UserOutlined } from '@ant-design/icons';
import { Radio } from 'antd';

import { ROLES } from 'utils/constants';

import NoProject from 'components/empty/Projects';

export default function Header() {
	const [value, setValue] = useState(ROLES[0].value);

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<div className={styles.container__header}>
			<div style={{ display: 'flex' }}>
				<div className={styles.container__header__user}>
					<UserOutlined className={styles.container__header__user__icon} />
				</div>

				<p className={styles.container__header__welcome}>Welcome User</p>
			</div>

			<div className={styles.container__header__role}>
				<p className={styles.container__header__role__header}>Role </p>

				<Radio.Group onChange={onChange} value={value}>
					{ROLES.map(({ label, value }, index) => (
						<Radio key={index} value={value}>
							{label}
						</Radio>
					))}
				</Radio.Group>
			</div>

			<div className={styles.container__header__projects}>
				<p className={styles.container__header__projects__header}>Projects </p>

				{true == !!value ? (
					<NoProject />
				) : (
					<div className={styles.container__header__projects__container}>
						<div className={styles.container__header__projects__container__item}>
							<p className={styles.container__header__projects__container__item__text}>
								Title: <span>Project 1</span>
							</p>

							<p className={styles.container__header__projects__container__item__text}>
								Description: <span>Description 1</span>
							</p>

							<p className={styles.container__header__projects__container__item__text}>
								Employees: <span>10</span>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
