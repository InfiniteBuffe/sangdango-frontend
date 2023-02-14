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
    const current_service = ['club']
    const current_service_title = {
        club: '동아리'
    }
    const ClubMenu = [
        // path가 /service/club/home 일 경우 -> 'home', /service/club/view 일 경우 -> 'view'
        { id: 0, name: '홈', path_name: 'home' },
        { id: 1, name: '둘러보기', path_name: 'view' },
        { id: 3, name: '행사 및 일정', path_name: 'plan' },
        { id: 2, name: '내 정보', path_name: 'my' },
    ]
    const now_path = router.pathname
    const [viewHeader, setViewHeader] = useState(false)
    const [title, setTitle] = useState('')

    const path = now_path.split('/')

    useEffect(() => {
        if (path[1] == 'service' && path[2] in current_service) {
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
                        <span className={styles.highlight}>상당고</span> {current_service_title[path[2]]}
                    </div>
                    <div className={styles.menu_box}>

                        {
                            (path[2] == 'club') ? (
                                ClubMenu.map(e => {
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