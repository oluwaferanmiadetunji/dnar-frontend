import styles from './style.module.scss';

import Layout from 'components/layout';
import AddEmployee from './components/AddEmployee';
import Projects from './components/Projects';
import NoEmployees from 'components/empty/Employees';

import { Collapse } from 'antd';

import { useSelector } from 'react-redux';
import { getRole } from 'utils/helpers';
import { DEFAULT_IMAGE } from 'utils/constants';

const { Panel } = Collapse;

export default function Employees() {
	const { roles, employees, user } = useSelector((state) => state);

	return (
		<Layout title='Employees'>
			<div className={styles.container}>
				<div className={styles.container__card}>
					<div className={styles.container__card__header}>
						<p className={styles.container__card__header__text}>Employees ({employees.length})</p>

						<AddEmployee />
					</div>

					<div className={styles.container__card__employees}>
						<Collapse accordion>
							{employees.length > 0 ? (
								employees
									.filter((employee) => employee.data.id !== user.data.id)
									.map(({ data, role, projects }, index) => {
										const { first_name, last_name, email, country, id } = data;

										return (
											<Panel key={index} showArrow={false} header={`${first_name || last_name ? `${first_name} ${last_name}` : email}`} key={id}>
												<div className={styles.container__card__employees__item}>
													<div className={styles.container__user}>
														<div className={styles.container__user__image}>
															<img src={DEFAULT_IMAGE} alt='user' />
														</div>

														<div className={styles.container__user__details}>
															<p className={styles.container__user__details__item}>
																Name: <span>{first_name || last_name ? `${first_name} ${last_name}` : 'Null'}</span>
															</p>

															<p className={styles.container__user__details__item}>
																Email: <span>{email || 'Null'}</span>
															</p>

															<p className={styles.container__user__details__item}>
																Country: <span>{country || 'Null'}</span>
															</p>
															<p className={styles.container__user__details__item}>
																Role: <span>{getRole(roles, role) || 'Null'}</span>
															</p>
														</div>

														<Projects projects={projects} employeed_id={id} />
													</div>
												</div>
											</Panel>
										);
									})
							) : (
								<NoEmployees />
							)}
						</Collapse>
					</div>
				</div>
			</div>
		</Layout>
	);
}
