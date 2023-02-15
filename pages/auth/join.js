import Header from '@/components/Header'
import styles from '@/styles/pages/auth/Join/Join.module.css'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import classNames from 'classnames'
import { useState } from 'react'
import Twemoji from 'react-twemoji'

const Join = () => {

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })

    const nextButton = () => {
        setFirstViewStyle(styles.fadeout)
        setTimeout(() => {
            setFirstViewStyle(styles.remove)
            setSecondViewStyle(styles.fadein)
        }, 700) // css에서 재생시간 변경 시 ms단위로 여기도 변경 필요함.
    }

    const [firstViewStyle, setFirstViewStyle] = useState()
    const [secondViewStyle, setSecondViewStyle] = useState(styles.remove)

    return (
        <>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    회원가입
                </div>
                <div className={styles.title_info}>
                    서비스를 이용하기 위한 계정을 생성합니다.
                </div>
                <span className={firstViewStyle}>
                    <div className={styles.intro_text}>
                        <Twemoji options={{ className: styles.intro_emoji }}>👏</Twemoji>
                        <div className={styles.space} />
                        <div id={styles.intro_1}>
                            반가워요.
                        </div>
                        <div className={styles.space} />
                        <div id={styles.intro_2}>
                            아래 버튼을 눌러<br />계정을 만들어보세요.
                        </div>
                    </div>
                    <ThemeProvider theme={theme}>
                        <Button
                            fullWidth
                            style={{
                                fontFamily: 'pretendard',
                                fontWeight: 600,
                                height: '60px',
                                fontSize: '18px',
                                width: 'calc(100% - 30px)',
                                left: '15px',
                                color: 'white',
                                borderRadius: '20px',
                                position: 'absolute',
                                bottom: '15px'
                            }}
                            variant="contained"
                            size="large"
                            color="dark"
                            onClick={nextButton}
                        >
                            시작하기 →
                        </Button>
                    </ThemeProvider>
                </span>
                <span className={secondViewStyle}>
                    <div className={styles.terms}>
                        <div className={styles.space} />
                        <div className={styles.terms_title}>
                            <span id={styles.terms_light}>잠깐!</span><br />
                            <span id={styles.terms_highlight}>약관 동의</span>가 필요해요.
                        </div>
                    </div>
                </span>
            </div>
        </>
    )
}

export default Join