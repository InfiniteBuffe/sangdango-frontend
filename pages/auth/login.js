import Header from 'components/Header'
import styles from 'styles/pages/auth/Login/Login.module.css'
import { createTheme, ThemeProvider } from '@mui/material'
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import { signOut, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = () => {

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const { data: session, status: isLogin } = useSession()
    const router = useRouter()

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })

    if (isLogin == 'authenticated' && router.query.redirect != null) {
        let redirect_url = router.query.redirect
        if (!redirect_url.startsWith(url)) return
        router.push(redirect_url)
    }

    return (
        <>
            <Header />
            <div className={styles.box}>
                {(session) ? (
                    <div className={styles.account_card}>
                        <div className={styles.account_text}>
                            {session.user.name}
                        </div>
                        <div className={styles.account_logout_box} onClick={() => signOut()}>
                            <div className={styles.account_logout}>
                                로그아웃
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
                <div className={styles.login}>
                    <div className={styles.title}>
                        로그인
                    </div>
                    <div className={styles.title_info}>
                        상당고 학생정보망에 로그인합니다.
                    </div>
                    <div className={styles.space} />
                    <ThemeProvider theme={theme}>
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
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}

export default Login