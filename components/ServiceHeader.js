import styles from '@/styles/components/ServiceHeader/ServiceHeader.module.css'
import Container from '@/components/Container'
import Squeeze from '@animated-burgers/burger-squeeze'
import '@animated-burgers/burger-squeeze/dist/styles.css'
import { useEffect, useState } from 'react'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useRouter } from 'next/router'

const ServiceHeader = (props) => {

    const [drawerButtonOpen, setDrawerButtonOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const ChangeDrawer = () => {
        let change = !drawerButtonOpen
        setDrawerButtonOpen(change)
        setDrawerOpen(change)
    }
    const router = useRouter()
    const current_service = { 'rental': true }
    const current_service_title = {
        rental: '우산대여시스템'
    }
    const RentalMenu = [
        { id: 0, name: '홈', path_name: 'home' },
        { id: 1, name: '신청', path_name: 'add' },
        { id: 2, name: '취소', path_name: 'cancel' },
        { id: 3, name: '조회', path_name: 'view' },
    ]
    const now_path = router.pathname
    const [viewHeader, setViewHeader] = useState(false)
    const [title, setTitle] = useState('')

    const path = now_path.split('/')

    useEffect(() => {
        if (path[1] == 'service' && path[2] in current_service && current_service[path[2]]) {
            setViewHeader(true)
            setTitle(current_service_title[path[2]])
        } else {
            setViewHeader(false)
            setTitle('')
        }
    }, [router.pathname])

    // ServiceHeader가 적용되는 페이지가 아닐 경우
    if (!viewHeader) return (<></>)

    return (
        <>
            <div className={styles.header}>
                {/* <div className={styles.drawer_button}>
                    <Squeeze
                        isOpen={drawerButtonOpen}
                        onClick={ChangeDrawer}
                        direction="right"
                        style={{ fontSize: '10px' }}
                    />
                </div> */}
                {/* Drawer | 필요 없어보여서 제외함 */}
                {/* <div className={styles.drawer_box}>
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
                </div> */}
                <Container>
                    <div className={styles.title}>
                        <span className={styles.highlight}>상당고</span> {current_service_title[path[2]]}
                    </div>
                    <div className={styles.menu_box}>
                        {/* 나중에 코드 정리할 것 */}

                        {
                            (path[2] == 'rental') ? (
                                RentalMenu.map(e => {
                                    let _path = now_path.split('/')[3]
                                    let is_active = false
                                    if (_path == e.path_name) is_active = true
                                    return (
                                        <div
                                            key={e.id}
                                            id={(is_active) ? (styles.menu_active) : (undefined)}
                                            className={styles.menu_item}
                                            onClick={() => router.push(`/service/${path[2]}/${e.path_name}`)}
                                        >
                                            {e.name}
                                        </div>
                                    )
                                })
                            ) : false
                        }
                    </div>
                </Container>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default ServiceHeader