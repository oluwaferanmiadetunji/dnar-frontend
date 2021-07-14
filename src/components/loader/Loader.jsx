import styles from './style.module.scss';

export default function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.container__loader} />
		</div>
	);
}
