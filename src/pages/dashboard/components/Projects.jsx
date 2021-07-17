import styles from 'pages/dashboard/style.module.scss';

import { DeleteOutlined } from '@ant-design/icons';

export default function Projects() {
	return (
		<div className={styles.container__projects}>
			<p className={styles.container__projects__header}>Projects</p>

			<div className={styles.container__projects__container}>
				<div className={styles.container__projects__container__item}>
					<p className={styles.container__projects__container__item__text}>
						Title: <span>Title 1</span>
					</p>

					<p className={styles.container__projects__container__item__text}>
						Description: <span>Description 1</span>
					</p>

					<button className={styles.container__projects__container__item__button}>
						<span>Remove</span>
						<DeleteOutlined className={styles.container__projects__container__item__button__icon} />
					</button>
				</div>
			</div>
		</div>
	);
}
