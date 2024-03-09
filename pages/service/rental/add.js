import styles from '@/styles/pages/services/Rental/Add/Add.module.css'

const Add = () => {
    return (
        <>
            <div className={styles.now_quantity} id={styles.warning}>
                <div className={styles.title}>
                    <div className={styles.name}>
                        잔여 수량
                    </div>
                    <div className={styles.timestamp}>
                        화면 접속 기준
                    </div>
                </div>
                <div className={styles.quantity}>
                    40개
                </div>
            </div>
        </>
    )
}

export default Add