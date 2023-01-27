
import styles from '@/styles/components/BottomNav/BottomNav.module.css'
import {
    IoHomeOutline,
    IoHome,
    IoCalendarClearOutline,
    IoCalendarClear,
    IoSearchOutline,
    IoSearch,
    IoPersonOutline,
    IoPerson
} from 'react-icons/io5';
import { useRouter } from 'next/router';

const BottomNav = (props) => {

    const router = useRouter()
    const ClubMenu = [
        // path가 /service/club/home 일 경우 -> 'home', /service/club/view 일 경우 -> 'view'
        { id: 0, name: '홈', path_name: 'home', icon: <IoHomeOutline size={25} />, active: <IoHome size={25} /> },
        { id: 1, name: '둘러보기', path_name: 'view', icon: <IoSearchOutline size={25} />, active: <IoSearch size={25} /> },
        { id: 3, name: '행사 및 일정', path_name: 'plan', icon: <IoCalendarClearOutline size={25} />, active: <IoCalendarClear size={25} /> },
        { id: 2, name: '내 정보', path_name: 'my', icon: <IoPersonOutline size={25} />, active: <IoPerson size={25} /> },
    ]
    const now_path = router.pathname

    return (
        <>
            <div className={styles.bottom_nav}>
                <div className={styles.menu_box}>
                    {
                        (props.service == 'club') ? (
                            ClubMenu.map(e => {
                                let icon = e.icon
                                let path = now_path.split('/')[3]
                                if (path == e.path_name) icon = e.active
                                return (
                                    <div key={e.id} className={styles.menu} onClick={() => router.push(`/service/${props.service}/${e.path_name}`)}>
                                        <div className={styles.icon}>
                                            {icon}
                                        </div>
                                    </div>
                                )
                            })
                        ) : false
                    }
                </div>
            </div>
        </>
    )
}

export default BottomNav