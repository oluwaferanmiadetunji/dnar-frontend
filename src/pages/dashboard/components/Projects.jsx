import styles from 'pages/dashboard/style.module.scss';

import { DeleteOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';

import NoProject from 'components/empty/Projects';

export default function Projects() {
	const { projects } = useSelector((state) => state.user);

	return (
		<div className={styles.container__projects}>
			<p className={styles.container__projects__header}>Projects</p>

			<div className={styles.container__projects__container}>
				{projects.length > 0 ? (
					projects.map(({ name, description }, index) => (
						<div key={index} className={styles.container__projects__container__item}>
							<p className={styles.container__projects__container__item__text}>
								Title: <span>{name}</span>
							</p>

							<p className={styles.container__projects__container__item__text}>
								Description: <span>{description}</span>
							</p>

							<button className={styles.container__projects__container__item__button}>
								<span>Remove</span>
								<DeleteOutlined className={styles.container__projects__container__item__button__icon} />
							</button>
						</div>
					))
				) : (
					<NoProject />
				)}
			</div>
		</div>
	);
}
