import Header from '@/components/Header'
import styles from '@/styles/pages/auth/Join/Join.module.css'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const Join = () => {

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
                <div className={styles.title}>
                    회원가입
                </div>
                <div className={styles.title_info}>
                    서비스를 이용하기 위한 계정을 생성합니다.
                </div>
                <div className={styles.intro_text}>
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
                    >
                        시작하기 →
                    </Button>
                </ThemeProvider>
                {/* <div className={styles.bottom_button}>
                    모두 동의합니다 →
                </div> */}
            </div>
        </>
    )
}

export default Join