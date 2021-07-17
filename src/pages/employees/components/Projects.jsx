import { useState } from 'react';

import PropTypes from 'prop-types';

import styles from 'pages/employees/style.module.scss';

import NoProjects from 'components/empty/Projects';
import { Button as Loader } from 'components/loader';

import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';

import { makePostRequest } from 'utils/api';
import { getProjectDetails } from 'utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { setEmployees } from 'store/employees.slice';

const Projects = ({ projects, employeed_id }) => {
	const [loading, setLoading] = useState(false);
	const [ID, setID] = useState('');

	const dispatch = useDispatch();

	const allEmployees = useSelector((state) => state.employees);
	const allProjects = useSelector((state) => state.projects);

	const removeProject = async (id) => {
		setLoading(true);
		setID(id);

		const { data, error } = await makePostRequest({
			path: `/employee/${employeed_id}/project/remove`,
			payload: { project_id: id },
		});

		if (!error) {
			message.success('Project removed successfully');

			let newEmployees = [...allEmployees];
			const indexOfEmployee = newEmployees.findIndex((employee) => employee.data.id === employeed_id);

			let employeeData = { ...newEmployees[indexOfEmployee] };
			employeeData.projects = newEmployees[indexOfEmployee].projects.filter((project) => project.project_id !== id);

			newEmployees[indexOfEmployee] = employeeData;

			dispatch(setEmployees(newEmployees));
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	return (
		<div className={styles.container__employees__projects}>
			<div className={styles.container__employees__projects__header}>
				<p className={styles.container__employees__projects__header__text}>Projects</p>
			</div>

			<div className={styles.container__employees__projects__item__container}>
				{projects.length > 0 ? (
					projects.map(({ project_id }, index) => (
						<div key={index} className={styles.container__employees__projects__item}>
							<p className={styles.container__employees__projects__item__text}>
								Title: <span>{getProjectDetails(allProjects, project_id).name}</span>
							</p>

							<p className={styles.container__employees__projects__item__text}>
								Description 1: <span>{getProjectDetails(allProjects, project_id).description}</span>
							</p>

							<button className={styles.container__employees__projects__item__button} onClick={() => removeProject(project_id)}>
								{loading && ID === project_id ? (
									<Loader />
								) : (
									<>
										<span>Remove</span>
										<DeleteOutlined className={styles.container__employees__projects__item__button__icon} />
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
	);
};

Projects.propTypes = {
	projects: PropTypes.any,
	employeed_id: PropTypes.string,
};

export default Projects;
