import styles from './style.module.scss';

import Layout from 'components/layout';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

export default function Projects() {
	return (
		<Layout title='Projects'>
			<div className={styles.container}>
				<div className={styles.container__card}>
					<div className={styles.container__card__header}>
						<p className={styles.container__card__header__text}>Projects</p>

						<button className={styles.container__card__header__button}>
							Add Project <PlusOutlined className={styles.container__card__header__button__icon} />
						</button>
					</div>

					<div className={styles.container__card__projects}>
						<div className={styles.container__card__projects__item}>
							<p className={styles.container__card__projects__item__text}>
								Title: <span>Title 1</span>
							</p>

							<p className={styles.container__card__projects__item__text}>
								Description: <span>Description 1</span>
							</p>

							<button className={styles.container__card__projects__item__button}>
								<span>Remove</span>
								<DeleteOutlined className={styles.container__card__projects__item__button__icon} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
