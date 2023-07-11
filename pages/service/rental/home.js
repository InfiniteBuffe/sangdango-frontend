import AlertBar from '@/components/AlertBar'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'
import styles from '@/styles/pages/services/Rental/Home/Home.module.css'
import Container from 'components/Container'

const Home = () => {
    return (
        <>
            {/* <AlertBar content='아직 서비스가 불안정합니다.' /> */}
            <div className={styles.intro_text}>
                <div id={styles.intro_highlight}>우산대여,</div>온라인으로 간편하게!
            </div>
            <Container>
                <div className={styles.status}>
                    <div className={styles.status_flex}>
                        <div className={styles.status_title}>
                            가능 수량
                        </div>
                        <div className={styles.status_number}>
                            30개
                        </div>
                        <div className={styles.status_message}>
                            <div className={styles.status_now_circle} />
                            <div className={styles.status_now_message}>
                                실시간 수량
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.notice}>
                    아직 신청을 할 수 없어요.<br/>곧 다시 만나요!
                </div>
            </Container>
        </>
    )
}

export default Home