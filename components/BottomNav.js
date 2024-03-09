import styles from '@/styles/components/BottomNav/BottomNav.module.css'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { IoSearchOutline, IoSearch, IoCloseOutline, IoClose, IoAddCircleOutline, IoAddCircle   } from "react-icons/io5";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const BottomNav = (props) => {

    const router = useRouter()
    const [viewHeader, setViewHeader] = useState(false)
    const now_path = router.pathname
    const path = now_path.split('/')
    
    useEffect(() => {
        const current_service = { 'rental': true }
        if (path[1] == 'service' && path[2] in current_service && current_service[path[2]]) {
            setViewHeader(true)
        } else {
            setViewHeader(false)
        }
    }, [router.pathname])

    // ServiceHeader가 적용되는 페이지가 아닐 경우
    if (!viewHeader) return null;

    const current_service_title = {
        rental: '우산대여시스템',
    }
    
    const RentalMenu = [
        { id: 0, name: '홈', path_name: 'home', icon: <AiOutlineHome size={25} />, active: <AiFillHome size={25} /> },
        { id: 2, name: '신청', path_name: 'add', icon: <IoAddCircleOutline size={25} />, active: <IoAddCircle size={25} /> },
        { id: 3, name: '취소', path_name: 'cancel', icon: <IoCloseOutline size={25} />, active: <IoClose size={25} /> },
        { id: 4, name: '조회', path_name: 'view', icon: <IoSearchOutline size={25} />, active: <IoSearch size={25} /> }
    ]

    return (
        <div className={styles.bottom_nav}>
            <div className={styles.menu_box}>
                {/* 이 코드도 정리 필요함. */}
                {
                    (path[2] === 'rental') && RentalMenu.map(e => {
                        let icon = e.icon
                        let _path = now_path.split('/')[3]
                        if (_path === e.path_name) icon = e.active
                        return (
                            <div key={e.id} className={styles.menu} onClick={() => router.push(`/service/${path[2]}/${e.path_name}`)}>
                                <div className={styles.icon}>
                                    {icon}
                                </div>
                                <div className={styles.name}>
                                    {e.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BottomNav
