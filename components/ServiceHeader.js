import styles from '@/styles/components/ServiceHeader/ServiceHeader.module.css'
import Container from '@/components/Container'

const ServiceHeader = (props) => {
    return (
        <>
            <div className={styles.header}>
                <Container>
                    <div className={styles.title}>
                        <span className={styles.highlight}>상당고</span> {props.title}
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_item} id={styles.menu_active}>
                            홈
                        </div>
                        <div className={styles.menu_item}>
                            목록
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default ServiceHeader