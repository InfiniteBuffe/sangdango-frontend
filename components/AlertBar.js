import styles from '@/styles/components/AlertBar/AlertBar.module.css'
import { IoNotifications } from 'react-icons/io5';
const AlertBar = (props) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.box} id={styles.yellow}>
                    <div className={styles.alert_bar}>
                        <div className={styles.icon}>
                            <IoNotifications size={20} />
                        </div>
                        <div className={styles.text}>
                            {props.content}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlertBar