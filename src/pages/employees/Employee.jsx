import { useState } from 'react';

import styles from './style.module.scss';

import Layout from 'components/layout';
import { Button as Loader } from 'components/loader';
import AddEmployee from './components/AddEmployee';
import NoProjects from 'components/empty/Projects';

import { message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from 'store/projects.slice';

import { makeDeleteRequest } from 'utils/api';
import { getRole } from 'utils/helpers';
import { DEFAULT_IMAGE } from 'utils/constants';

export default function Projects() {
	const [loading, setLoading] = useState(false);
	const [ID, setID] = useState('');

	const dispatch = useDispatch();
	const { roles, user, projects, employees } = useSelector((state) => state);

	const deleteProject = async (id) => {
		setLoading(true);
		setID(id);
		const { data, error } = await makeDeleteRequest(`/project/${id}`);

		if (!error) {
			message.success('Project deleted successfully');
			const newProjects = projects.filter((project) => project.id !== id);
			dispatch(setProjects(newProjects));
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	return (
		<Layout title='Employees'>
			<div className={styles.container}>
				<div className={styles.container__card}>
					<div className={styles.container__card__header}>
						<p className={styles.container__card__header__text}>Employees ({employees.length})</p>

						<AddEmployee />
					</div>

					<div className={styles.container__card__employees}>
						{employees.length > 0 ? (
							employees.map(({ first_name, last_name, email, country, role, id }, index) => (
								<div key={index} className={styles.container__card__employees__item}>
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
									</div>
									{/* <button className={styles.container__card__employees__item__button} onClick={() => deleteProject(id)}>
										{loading && ID === id ? (
											<Loader />
										) : (
											<>
												<span>Remove</span>
												<DeleteOutlined className={styles.container__card__employees__item__button__icon} />
											</>
										)}
									</button> */}
								</div>
							))
						) : (
							<NoProjects />
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
