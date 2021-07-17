import { useState } from 'react';

import styles from 'pages/dashboard/style.module.scss';

import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setUserProjects } from 'store/user.slice';

import NoProject from 'components/empty/Projects';
import { Button as Loader } from 'components/loader';
import AssignProject from './AssignProject';

import { getProject } from 'utils/helpers';
import { makePostRequest } from 'utils/api';

export default function Projects() {
	const dispatch = useDispatch();

	const [ID, setID] = useState('');
	const [loading, setLoading] = useState(false);

	const user = useSelector((state) => state.user);
	const projects = useSelector((state) => state.projects);

	const removeProject = async (id) => {
		setLoading(true);
		setID(id);

		const { data, error } = await makePostRequest({
			path: `/employee/${user.data.id}/project/remove`,
			payload: { project_id: id },
		});

		if (!error) {
			message.success('Project removed successfully');
			const newProjects = user.projects.filter((project) => project.project_id !== id);
			dispatch(setUserProjects(newProjects));
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	return (
		<div className={styles.container__projects}>
			<div className={styles.container__projects__header}>
				<p className={styles.container__projects__header__text}>Projects ({user.projects.length})</p>

				<AssignProject />
			</div>

			<div className={styles.container__projects__container}>
				{user.projects.length > 0 ? (
					user.projects.map(({ project_id, id }, index) => (
						<div key={index} className={styles.container__projects__container__item}>
							<p className={styles.container__projects__container__item__text}>
								Title: <span>{getProject(projects, project_id)?.name}</span>
							</p>

							<p className={styles.container__projects__container__item__text}>
								Description: <span>{getProject(projects, project_id)?.description}</span>
							</p>

							<button className={styles.container__projects__container__item__button} onClick={() => removeProject(project_id)}>
								{loading && ID === project_id ? (
									<Loader />
								) : (
									<>
										<span>Remove</span>
										<DeleteOutlined className={styles.container__projects__container__item__button__icon} />
									</>
								)}
							</button>
						</div>
					))
				) : (
					<NoProject />
				)}
			</div>
		</div>
	);
}
