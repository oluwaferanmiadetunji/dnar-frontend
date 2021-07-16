import { useState } from 'react';

import styles from 'pages/dashboard/style.module.scss';

import { Button as Loader } from 'components/loader';

import { Modal, message } from 'antd';

import { makePostRequest } from 'utils/api';

export default function Header() {
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [country, setCountry] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: '/employee', payload: { email, first_name: firstName, last_name: lastName, country } });

		if (!error) {
			message.success('Employee created successfully');
			setLoading(false);
			setTimeout(() => {
				closeModal();
			}, 750);
		} else {
			message.error(data.message);
		}
	};

	const closeModal = () => {
		setVisible(false);
		setLoading(false);
		setEmail('');
		setFirstName('');
		setLastName('');
		setCountry('');
	};

	return (
		<>
			<button className={styles.container__details__header__search__button} type='button' onClick={() => setVisible(true)}>
				Add Employee
			</button>

			<Modal className={styles.container__details__modal} footer={null} centered visible={visible} onCancel={closeModal}>
				<p className={styles.container__details__modal__header}>Add Employee</p>

				<form className={styles.container__details__modal__form} onSubmit={handleSubmit}>
					<div className={styles.container__details__modal__form__item}>
						<p className={styles.container__details__modal__form__item__label}>First Name</p>

						<input
							className={styles.container__details__modal__form__item__input}
							placeholder='Enter Employee First Name'
							type='text'
							required
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</div>

					<div className={styles.container__details__modal__form__item}>
						<p className={styles.container__details__modal__form__item__label}>Last Name</p>

						<input
							className={styles.container__details__modal__form__item__input}
							placeholder='Enter Employee Last Name'
							type='text'
							required
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
						/>
					</div>

					<div className={styles.container__details__modal__form__item}>
						<p className={styles.container__details__modal__form__item__label}>Email Address</p>

						<input
							className={styles.container__details__modal__form__item__input}
							placeholder='Enter your Email Address'
							type='email'
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<div className={styles.container__details__modal__form__item}>
						<p className={styles.container__details__modal__form__item__label}>Country</p>

						<input
							className={styles.container__details__modal__form__item__input}
							placeholder='Enter Employee Country'
							type='text'
							required
							value={country}
							onChange={(event) => setCountry(event.target.value)}
						/>
					</div>

					<button type='submit' className={styles.container__details__modal__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Enter'}
					</button>
				</form>
			</Modal>
		</>
	);
}
