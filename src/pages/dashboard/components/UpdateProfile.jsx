import { useState } from 'react';

import styles from 'pages/dashboard/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { makePatchRequest } from 'utils/api';
import { getNormalisedOptions } from 'utils/helpers';

import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUserRole } from 'store/user.slice';

export default function UpdateProfile() {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const roles = useSelector((state) => state.roles);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [firstName, setFirstName] = useState(user?.data?.first_name || '');
	const [lastName, setLastName] = useState(user?.data?.last_name || '');
	const [country, setCountry] = useState(user?.data?.country || '');
	const [role, setRole] = useState(user?.role);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const response = await makePatchRequest({ path: `/employee/${user.data.id}`, payload: { first_name: firstName, last_name: lastName, country, role_id: role } });

		if (!response.error) {
			dispatch(setUserData(response.data.data));
			dispatch(setUserRole(response.data.role));
			message.success('Profile updated successfully');
			setLoading(false);
			setTimeout(() => {
				closeModal();
			}, 750);
		} else {
			message.error(response.data.message);
		}
	};

	const closeModal = () => {
		setVisible(false);
		setLoading(false);
	};

	return (
		<div className={styles.container__user__update}>
			<Tooltip title='Update Profile'>
				<div className={styles.container__user__update__icon__container}>
					<EditOutlined className={styles.container__user__update__icon} onClick={() => setVisible(true)} />
				</div>
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
							value={user?.data?.email || ''}
							disabled
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
							}}>
							<option value={getNormalisedOptions(roles, role).selectedRole.id}>{getNormalisedOptions(roles, role).selectedRole.title}</option>
							{getNormalisedOptions(roles, role).otherRoles.map(({ title, id }, index) => (
								<option key={index} value={id}>
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
