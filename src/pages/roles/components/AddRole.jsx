import { useState } from 'react';

import styles from 'pages/roles/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { makePostRequest } from 'utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { setRoles } from 'store/roles.slice';

export default function Header() {
	const dispatch = useDispatch();
	const roles = useSelector((state) => state.roles);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: '/role', payload: { title, description } });

		if (!error) {
			message.success('Role created successfully');

			dispatch(setRoles([data, ...roles]));
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
		setTitle('');
		setDescription('');
	};

	return (
		<>
			<button className={styles.container__card__header__button} onClick={() => setVisible(true)}>
				Add Role <PlusOutlined className={styles.container__card__header__button__icon} />
			</button>

			<Modal className={styles.container__card__roles__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__card__roles__modal__header}>Add Role</p>

				<form className={styles.container__card__roles__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__card__roles__modal__form__item}>
						<p className={styles.container__card__roles__modal__form__item__label}>Title</p>

						<input
							className={styles.container__card__roles__modal__form__item__input}
							placeholder='Enter Title'
							type='text'
							required
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__roles__modal__form__item}>
						<p className={styles.container__card__roles__modal__form__item__label}>Description </p>

						<input
							className={styles.container__card__roles__modal__form__item__input}
							placeholder='Enter Description'
							type='text'
							required
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>
					</div>

					<button type='submit' className={styles.container__card__roles__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Submit'}
					</button>
				</form>
			</Modal>
		</>
	);
}
