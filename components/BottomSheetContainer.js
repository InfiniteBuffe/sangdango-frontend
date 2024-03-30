import styles from '@/styles/components/BottomSheetContainer/BottomSheetContainer.module.css'

const BottomSheetContainer = (props) => {
    return (
        <>
            <div className={styles.container}>
                {props.children}
            </div>
            <div className={styles.space} />
        </>
    )
}

export default BottomSheetContainer