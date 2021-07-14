import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './style.module.scss';

import { Button as Loader } from 'components/loader';

import { ROUTES } from 'utils/contants';

export default function Login() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);

	const [email, setEmail] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			history.push(ROUTES.DASHBOARD);
		}, 1500);
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
