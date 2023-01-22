import styles from '@/styles/components/ServiceHeader/ServiceHeader.module.css'

const ServiceHeader = () => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>
                    동아리
                </div>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default ServiceHeader