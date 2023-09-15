import classNames from 'classnames'
import { useState, useEffect } from 'react'
import styles from 'styles/components/PopupModal/PopupModal.module.css'

const PopupModal = ({open, cb, title, children, buttonText}) => {

    const [className, setClassName] = useState({ container: styles.none, box: styles.none })

    useEffect(() => {
        if (open) {
            setClassName({ container: styles.container, box: styles.box })
        }
    }, [open])

    const closeModal = () => {
        cb(false)
        setClassName({ container: styles.close_container, box: styles.close_box })
    }

    return (
        <>
            <div className={classNames(className.container)}>
                <div className={classNames(className.box)}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    {/* <div className={styles.title_info}>
                        
                    </div> */}
                    <div className={styles.space} />
                    {/* <div className={styles.alert}>
                        로그인을 이용한 기능은 곧 만나보실 수 있어요!
                    </div> */}
                    {/* <div className={styles.space} /> */}
                    {children}
                    <div className={styles.space} />
                    <div className={styles.button} onClick={() => closeModal()}>
                        {buttonText}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopupModal