import styles from '@/styles/components/ServiceHeader/ServiceHeader.module.css'
import Container from '@/components/Container'
import Squeeze from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'
import { useState } from 'react'

const ServiceHeader = (props) => {

    const [drawerButtonOpen, setDrawerButtonOpen] = useState(false)

    const changeDrawerButton = () => {
        let change = !drawerButtonOpen
        setDrawerButtonOpen(change)
    }

    return (
        <>
            <div className={styles.header}>
                <Container>
                    <div className={styles.drawer_button}>
                        <Squeeze
                        isOpen={drawerButtonOpen}
                        onClick={changeDrawerButton}
                        direction="right"
                        style={{fontSize: '10px'}}
                        />
                        {/* Burger 색상은 global.scss 파일에 작성함*/}
                    </div>
                    <div className={styles.title}>
                        <span className={styles.highlight}>상당고</span> {props.title}
                    </div>
                    <div className={styles.menu_box}>
                        <div className={styles.menu_item} id={styles.menu_active}>
                            홈
                        </div>
                        <div className={styles.menu_item}>
                            둘러보기
                        </div>
                        <div className={styles.menu_item}>
                            내 정보
                        </div>
                        <div className={styles.menu_item}>
                            임시1
                        </div>
                        <div className={styles.menu_item}>
                            임시2
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default ServiceHeader