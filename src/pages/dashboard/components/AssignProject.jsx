import { useState } from 'react';

import styles from 'pages/dashboard/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { makePostRequest } from 'utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { setUserProjects } from 'store/user.slice';

import { getUnAssignedProjects } from 'utils/helpers';

export default function Header() {
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects);
	const user = useSelector((state) => state.user);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [projectID, setProjectID] = useState(getUnAssignedProjects(projects, user.projects)[0]?.id || '');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: `/employee/${user.data.id}/project/assign`, payload: { project_id: projectID } });

		if (!error) {
			message.success('Project assigned successfully');

			dispatch(setUserProjects([data, ...user.projects]));
			setTimeout(() => {
				closeModal();
			}, 250);
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	const closeModal = () => {
		setVisible(false);
		setLoading(false);
	};

	return (
		<>
			<button className={styles.container__projects__header__button} onClick={() => setVisible(true)}>
				Assign Project <PlusOutlined className={styles.container__projects__header__button__icon} />
			</button>

			<Modal className={styles.container__projects__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__projects__modal__header}>Assign Project</p>

				<form className={styles.container__projects__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__projects__modal__form__item}>
						<p className={styles.container__projects__modal__form__item__label}>Description </p>

						<select
							className={styles.container__user__update__modal__form__item__select}
							value={projectID}
							required
							onChange={(event) => {
								setProjectID(event.target.value);
							}}>
							{getUnAssignedProjects(projects, user.projects).map(({ name, id }, index) => (
								<option key={index} value={id}>
									{name}
								</option>
							))}
						</select>
					</div>

					<button type='submit' className={styles.container__projects__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Submit'}
					</button>
				</form>
			</Modal>
		</>
	);
}
