import styles from './style.module.scss';

export default function Loader() {
	return (
		<div className={styles.button}>
			<div className={styles.button__loader} />
		</div>
	);
}
