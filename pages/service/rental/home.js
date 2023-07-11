import AlertBar from '@/components/AlertBar'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'
import styles from '@/styles/pages/services/Rental/Home/Home.module.css'

const Home = () => {
    return (
        <>
            {/* <AlertBar content='아직 서비스가 불안정합니다.' /> */}
            <div className={styles.intro_text}>
                <div id={styles.intro_highlight}>우산대여,</div>온라인으로 간편하게!
            </div>
        </>
    )
}

export default Home