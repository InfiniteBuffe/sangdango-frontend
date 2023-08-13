import styles from '@/styles/pages/auth/join/Join/Join.module.css'
import Header from "@/components/Header";
import {grey} from "@mui/material/colors";
import Terms from "@/components/join/terms";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {useState} from "react";
import {MoonLoader} from "react-spinners";
import toast from "react-hot-toast";
import axios from "axios";
import {setCookie} from "cookies-next";
import {useRouter} from "next/router";

const Join = () => {
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    });
    const [buttonText, setButtonText] = useState('다음으로 →')
    const [buttonClick, setButtonClick] = useState(false)
    const [allSelected, setAllSelected] = useState(false)
    const router = useRouter()
    const nextButton = () => {
        if (!allSelected) {
            toast('필수 항목에 모두 동의해주세요.')
            return
        }
        setButtonText(
            <MoonLoader className={styles.loading} size={17} speedMultiplier={1} color="#000000" />
        )
        setButtonClick(true)
        axios({
            url: '/api/verify/join/create',
            method: 'post',
            data: {
                privacy_agree: true,
                terms_agree: true,
            }
        })
            .then(r=>{
                setCookie('join_token', r.data.token, {maxAge: 60 * 15}) // 15m
                router.push('/auth/join/class')
            })
    }
    return (
        <>
            <Header />
            <div className={styles.box}>
                <div className={styles.title}>
                    회원가입
                </div>
                <div className={styles.description}>
                    아래 약관을 읽어보신 후 체크해주세요.
                </div>
                <div className={styles.space} />
                <Terms checkedState={setAllSelected} buttonState={buttonClick} />
                <ThemeProvider theme={theme}>
                    <Button
                        fullWidth
                        style={{
                            fontFamily: 'pretendard',
                            fontWeight: 600,
                            height: '50px',
                            fontSize: '16px',
                            width: 'calc(100% - 30px)',
                            left: '15px',
                            color: 'white',
                            borderRadius: '20px',
                        }}
                        variant="contained"
                        size="large"
                        color="dark"
                        onClick={nextButton}
                        disabled={buttonClick}
                    >
                        {buttonText}
                    </Button>
                </ThemeProvider>
            </div>
        </>
    )
}

export default Join