import styles from 'pages/dashboard/style.module.scss';

import { Collapse } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export default function Employees() {
	return (
		<div className={styles.container__details__employees}>
			<Collapse accordion bordered={false}>
				<Panel showArrow={false} header='Employee 1' key='1'>
					<div className={styles.container__details__employees__panel}>
						<div className={styles.container__details__employees__panel__details}>
							<div className={styles.container__header__user}>
								<UserOutlined className={styles.container__header__user__icon} />
							</div>

							<div className={styles.container__details__employees__panel__details__more}>
								<p className={styles.container__details__employees__panel__details__more__item}>
									Name: <span>John Doe</span>
								</p>

								<p className={styles.container__details__employees__panel__details__more__item}>
									Role: <span>Senior</span>
								</p>
							</div>
						</div>

						<div className={styles.container__details__employees__panel__projects}>
							<div className={styles.container__details__employees__panel__projects__header}>Projects</div>

							<div className={styles.container__details__employees__panel__projects__container}>
								{[1].map(() => (
									<div key={Math.random()} className={styles.container__details__employees__panel__projects__container__item}>
										<div className={styles.container__details__employees__panel__projects__container__details}>
											<p className={styles.container__details__employees__panel__projects__container__item__text}>
												Title: <span>Title 1</span>
											</p>

											<p className={styles.container__details__employees__panel__projects__container__item__text}>
												Description: <span>Description 1</span>
											</p>
										</div>

										<button className={styles.container__details__employees__panel__projects__container__item__button}>
											Remove <DeleteOutlined className={styles.container__details__employees__panel__projects__container__item__button__icon} />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
				</Panel>
			</Collapse>
		</div>
	);
}
