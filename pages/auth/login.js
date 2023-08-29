import Header from 'components/Header'
import styles from 'styles/pages/auth/Login/Login.module.css'
import { TextField, Button, createTheme, ThemeProvider, InputAdornment, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { signOut, signIn, useSession } from 'next-auth/react';

const Login = () => {

    const { data: session } = useSession()

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })

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