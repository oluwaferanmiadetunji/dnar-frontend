import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import styles from './style.module.scss';

import { Button as Loader } from 'components/loader';

import { ROUTES } from 'utils/constants';

import { makePostRequest } from 'utils/api';

import { useDispatch } from 'react-redux';
import { setIsLogged, setUserData } from 'store/user.slice';

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const { error, data } = await makePostRequest({ path: '/employee/login', payload: { email } });

		if (!error) {
			message.success('Login successful');

			setTimeout(() => {
				setLoading(false);
				dispatch(setIsLogged(true));
				dispatch(setUserData(data));
				history.push(ROUTES.DASHBOARD);
			}, 500);
		} else {
			message.error(data.message);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.container__card}>
				<p className={styles.container__card__header}>Login</p>

				<form className={styles.container__card__form} onSubmit={handleSubmit}>
					<div className={styles.container__card__form__item}>
						<p className={styles.container__card__form__item__label}>Email Address</p>

						<input
							className={styles.container__card__form__item__input}
							placeholder='Enter your Email Address'
							type='email'
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>

					<button type='submit' className={styles.container__card__form__button} disabled={loading}>
						{loading ? <Loader /> : 'Enter'}
					</button>
				</form>
			</div>
		</div>
	);
}
