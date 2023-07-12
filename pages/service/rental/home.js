import AlertBar from '@/components/AlertBar'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'
import styles from '@/styles/pages/services/Rental/Home/Home.module.css'
import axios from 'axios'
import Container from 'components/Container'
import { useEffect, useState } from 'react'

const Home = () => {

    const [currentCount,setCurrentCount] = useState(0)
    
    useEffect(()=>{
        const url = (process.env.NEXT_PUBLIC_ENV=='dev')?(process.env.NEXT_PUBLIC_DEV_URL):(process.env.NEXT_PUBLIC_PROD_URL)
        axios({
            url: url + '/api/rental/current',
            method: 'GET',
        })
            .then(r=>{
                if (r.status != 200) {
                    setCurrentCount(0)
                }
                setCurrentCount(r.data.count)
            })
    }, [])

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
                            {currentCount}개
                        </div>
                        <div className={styles.status_message}>
                            <div className={styles.status_now_circle} />
                            <div className={styles.status_now_message}>
                                실시간 수량
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.warning}>
                    <span id={styles.warning_strong}>ⓘ 참고해주세요.</span><br/>
                    - 실시간으로 현재 수량이 표시되나, 새로고침 해야 갱신됩니다.<br/>
                    - 잘못된 학번으로 신청 시 불이익이 있을 수 있으니 확인해주세요.<br/>
                    - 타인의 정보를 무단으로 이용 후 적발 시 이용정지 됩니다.<br/>
                    - 반납은 익일 점심시간 반납을 원칙으로 합니다.
                </div>
                <div className={styles.notice}>
                    아직 신청을 할 수 없어요.<br/>곧 다시 만나요!
                </div>
            </Container>
        </>
    )
}

export default Home