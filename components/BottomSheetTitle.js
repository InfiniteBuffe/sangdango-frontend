import styles from '@/styles/components/BottomSheetTitle/BottomSheetTitle.module.css'

const BottomSheetTitle = (props) => {
    return (
        <>
            <div className={styles.title}>
                <div className={styles.text}>
                    {props.title}
                </div>
            </div>
            {props.description && (
                <div className={styles.description}>
                    <div className={styles.text}>
                        {props.description}
                    </div>
                </div>
            )}
            <div className={styles.space} />
        </>
    )
}

export default BottomSheetTitle