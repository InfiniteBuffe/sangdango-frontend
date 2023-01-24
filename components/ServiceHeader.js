import styles from '@/styles/components/ServiceHeader/ServiceHeader.module.css'
import Container from '@/components/Container'
import Squeeze from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

const ServiceHeader = (props) => {

    const [drawerButtonOpen, setDrawerButtonOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const ChangeDrawer = () => {
        let change = !drawerButtonOpen
        setDrawerButtonOpen(change)
        setDrawerOpen(change)
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.drawer_button}>
                    <Squeeze
                        isOpen={drawerButtonOpen}
                        onClick={ChangeDrawer}
                        direction="right"
                        style={{ fontSize: '10px' }}
                    />
                </div>
                {/* Drawer */}
                <div className={styles.drawer_box}>
                    <Drawer
                        open={drawerOpen}
                        onClose={ChangeDrawer}
                        direction='left'
                        className={styles.drawer}
                        zIndex={10}
                        overlayOpacity={0.15}
                    >
                        <div>메뉴는 여기에 들어감</div>
                    </Drawer>
                </div>
                <Container>
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