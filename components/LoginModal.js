import styles from 'styles/components/LoginModal/LoginModal.module.css'
import AlertBar from './AlertBar'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

const LoginModal = ({ open, cb }) => {

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
                        로그인
                    </div>
                    <div className={styles.title_info}>
                        상당고 학생정보망에 로그인합니다.
                    </div>
                    <div className={styles.space} />
                    <div className={styles.alert}>
                        로그인을 이용한 기능은 곧 만나보실 수 있어요!
                    </div>
                    <div className={styles.space} />
                    <Image
                        src="kakao_login_large_wide.png"
                        width={0}
                        height={0}
                        style={{
                            width: '100%',
                            height: 'auto',
                            cursor: 'pointer',
                        }}
                        loader={({ src }) => { return `https://cdn.sangdang.kr/${src}` }}
                        onClick={() => signIn('kakao')}
                    />
                    <div className={styles.space} />
                    <div className={styles.button} onClick={() => closeModal()}>
                        닫기
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal