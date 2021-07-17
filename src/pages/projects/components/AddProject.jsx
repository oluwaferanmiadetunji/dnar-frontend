import { useState } from 'react';

import styles from 'pages/projects/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { makePostRequest } from 'utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from 'store/projects.slice';

export default function Header() {
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.projects);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: '/project', payload: { name, description } });

		if (!error) {
			message.success('Project created successfully');

			dispatch(setProjects([data, ...projects]));
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
		setName('');
		setDescription('');
	};

	return (
		<>
			<button className={styles.container__card__header__button} onClick={() => setVisible(true)}>
				Add Project <PlusOutlined className={styles.container__card__header__button__icon} />
			</button>

			<Modal className={styles.container__card__projects__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__card__projects__modal__header}>Add Project</p>

				<form className={styles.container__card__projects__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__card__projects__modal__form__item}>
						<p className={styles.container__card__projects__modal__form__item__label}>Name</p>

						<input
							className={styles.container__card__projects__modal__form__item__input}
							placeholder='Enter Project Name'
							type='text'
							required
							value={name}
							onChange={(event) => setName(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__projects__modal__form__item}>
						<p className={styles.container__card__projects__modal__form__item__label}>Description </p>

						<input
							className={styles.container__card__projects__modal__form__item__input}
							placeholder='Enter Project Description'
							type='text'
							required
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>

					<button type='submit' className={styles.container__card__projects__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Submit'}
					</button>
				</form>
			</Modal>
		</>
	);
}
