import { useState } from 'react';

import styles from 'pages/dashboard/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { makePostRequest } from 'utils/api';

import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from 'store/user.slice';

export default function Header() {
	const dispatch = useDispatch();

	const { data } = useSelector((state) => state.user);
	const roles = useSelector((state) => state.roles);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState(data?.email || '');
	const [firstName, setFirstName] = useState(data?.first_name || '');
	const [lastName, setLastName] = useState(data?.last_name || '');
	const [country, setCountry] = useState(data?.country || '');
	const [role, setRole] = useState(data?.role || roles[0].label);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		dispatch(setUserData({ ...data, email, first_name: firstName, last_name: lastName, country, role }));
		message.success('Profile updated successfully');
		setLoading(false);
		setTimeout(() => {
			closeModal();
		}, 750);

		// const { error, data } = await makePostRequest({ path: '/employee', payload: { email, first_name: firstName, last_name: lastName, country } });

		// if (!error) {
		// 	message.success('Employee created successfully');
		// 	setLoading(false);
		// 	setTimeout(() => {
		// 		closeModal();
		// 	}, 750);
		// } else {
		// 	message.error(data.message);
		// }
	};

	const closeModal = () => {
		setVisible(false);
		setLoading(false);
	};

	return (
		<div className={styles.container__user__update}>
			<Tooltip title='Update Profile'>
				<EditOutlined className={styles.container__user__update__icon} onClick={() => setVisible(true)} />
			</Tooltip>
			<Modal className={styles.container__user__update__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__user__update__modal__header}>Update Profile</p>

				<form className={styles.container__user__update__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__user__update__modal__form__item}>
						<p className={styles.container__user__update__modal__form__item__label}>First Name</p>

						<input
							className={styles.container__user__update__modal__form__item__input}
							placeholder='Enter your First Name'
							type='text'
							required
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</div>

					<div className={styles.container__user__update__modal__form__item}>
						<p className={styles.container__user__update__modal__form__item__label}>Last Name</p>

						<input
							className={styles.container__user__update__modal__form__item__input}
							placeholder='Enter your Last Name'
							type='text'
							required
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						/>
					</div>

					<div className={styles.container__user__update__modal__form__item}>
						<p className={styles.container__user__update__modal__form__item__label}>Email Address</p>

						<input
							className={styles.container__user__update__modal__form__item__input}
							placeholder='Enter your Email Address'
							type='email'
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<div className={styles.container__user__update__modal__form__item}>
						<p className={styles.container__user__update__modal__form__item__label}>Country</p>

						<input
							className={styles.container__user__update__modal__form__item__input}
							placeholder='Enter your Country'
							type='text'
							required
							value={country}
							onChange={(event) => setCountry(event.target.value)}
						/>
					</div>

					<div className={styles.container__user__update__modal__form__item}>
						<p className={styles.container__user__update__modal__form__item__label}>Role</p>

						<select
							className={styles.container__user__update__modal__form__item__select}
							value={role}
							required
							onChange={(event) => {
								setRole(event.target.value);
								console.log(event.target.value);
							}}>
							{roles.map(({ title }, index) => (
								<option key={index} value={title}>
									{title}
								</option>
							))}
						</select>
					</div>

					<button type='submit' className={styles.container__user__update__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Enter'}
					</button>
				</form>
			</Modal>
		</div>
	);
}
