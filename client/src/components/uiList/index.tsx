
import styles from './uiList.module.css'

function UiList({ title, children }: { title: string, children: React.ReactNode }) {

	return (
		<div className={styles.wrapper}>
			<h3 className={styles.title}>{title}</h3>
			<ul className={styles.ul}>
				{children}
			</ul>
		</div>
	)
}


export default UiList