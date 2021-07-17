import { useState } from 'react';

import styles from 'pages/employees/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { makePostRequest } from 'utils/api';

import { setEmployees } from 'store/employees.slice';

import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
	const dispatch = useDispatch();
	const employees = useSelector((state) => state.employees);
	const roles = useSelector((state) => state.roles);

	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [country, setCountry] = useState('');
	const [role, setRole] = useState(roles[0].id);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: '/employee', payload: { email, first_name: firstName, last_name: lastName, country, role_id: role } });

		if (!error) {
			message.success('Employee created successfully');
			dispatch(setEmployees([...employees, data]));
			setTimeout(() => {
				closeModal();
			}, 750);
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	const closeModal = () => {
		setVisible(false);
		setLoading(false);
		setEmail('');
		setLastName('');
		setFirstName('');
		setCountry('');
	};

	return (
		<>
			<button className={styles.container__card__header__button} type='button' onClick={() => setVisible(true)}>
				Add Employee <PlusOutlined className={styles.container__card__header__button__icon} />
			</button>

			<Modal className={styles.container__card__employees__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__card__employees__modal__header}>Add Employee</p>

				<form className={styles.container__card__employees__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__card__employees__modal__form__item}>
						<p className={styles.container__card__employees__modal__form__item__label}>First Name</p>

						<input
							className={styles.container__card__employees__modal__form__item__input}
							placeholder='Enter Employee First Name'
							type='text'
							required
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__employees__modal__form__item}>
						<p className={styles.container__card__employees__modal__form__item__label}>Last Name</p>

						<input
							className={styles.container__card__employees__modal__form__item__input}
							placeholder='Enter Employee Last Name'
							type='text'
							required
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__employees__modal__form__item}>
						<p className={styles.container__card__employees__modal__form__item__label}>Email Address</p>

						<input
							className={styles.container__card__employees__modal__form__item__input}
							placeholder='Enter your Email Address'
							type='email'
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__employees__modal__form__item}>
						<p className={styles.container__card__employees__modal__form__item__label}>Country</p>

						<input
							className={styles.container__card__employees__modal__form__item__input}
							placeholder='Enter Employee Country'
							type='text'
							required
							value={country}
							onChange={(event) => setCountry(event.target.value)}
						/>
					</div>

					<div className={styles.container__card__employees__modal__form__item}>
						<p className={styles.container__card__employees__modal__form__item__label}>Role</p>

						<select
							className={styles.container__card__employees__modal__form__item__select}
							value={role}
							required
							onChange={(event) => {
								setRole(event.target.value);
							}}>
							{roles.map(({ title, id }, index) => (
								<option key={index} value={id}>
									{title}
								</option>
							))}
						</select>
					</div>

					<button type='submit' className={styles.container__card__employees__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Enter'}
					</button>
				</form>
			</Modal>
		</>
	);
}
