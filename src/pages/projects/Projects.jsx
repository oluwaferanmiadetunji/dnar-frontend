import { useState } from 'react';

import styles from './style.module.scss';

import Layout from 'components/layout';
import { Button as Loader } from 'components/loader';
import AddProject from './components/AddProject';
import NoProjects from 'components/empty/Projects';

import { message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { setProjects } from 'store/projects.slice';

import { makeDeleteRequest } from 'utils/api';

export default function Projects() {
	const [loading, setLoading] = useState(false);
	const [ID, setID] = useState('');

	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects);

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
		<Layout title='Projects'>
			<div className={styles.container}>
				<div className={styles.container__card}>
					<div className={styles.container__card__header}>
						<p className={styles.container__card__header__text}>Projects ({projects.length})</p>

						<AddProject />
					</div>

					<div className={styles.container__card__projects}>
						{projects.length > 0 ? (
							projects.map(({ name, description, id }, index) => (
								<div key={index} className={styles.container__card__projects__item}>
									<p className={styles.container__card__projects__item__text}>
										Title: <span>{name}</span>
									</p>

									<p className={styles.container__card__projects__item__text}>
										Description: <span>{description}</span>
									</p>

									<button className={styles.container__card__projects__item__button} onClick={() => deleteProject(id)}>
										{loading && ID === id ? (
											<Loader />
										) : (
											<>
												<span>Remove</span>
												<DeleteOutlined className={styles.container__card__projects__item__button__icon} />
											</>
										)}
									</button>
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
