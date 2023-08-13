import styles from '@/styles/pages/auth/join/Class/Class.module.css'
import Header from "@/components/Header";
import {Button, createTheme, ThemeProvider} from "@mui/material";
import {grey} from "@mui/material/colors";
import {useState, useEffect} from "react";
import Inputs from "@/components/join/inputs";
import {MoonLoader} from "react-spinners";
import {IoInformationCircleSharp} from "react-icons/io5";
import axios from "axios";
import {useRouter} from "next/router";

const Class = () => {

    const [isDisabled, setIsDisabled] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        axios({
            url: '/api/verify/join/check',
            withCredentials: true,
        })
            .then(r=>{
                if(r.data.verify) {
                    setIsDisabled(false)
                } else {
                    router.push('/auth/join')
                }
            })
    }, [])

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })
    const [errorMsg, setErrorMsg] = useState({
        active: false,
        msg: '',
    })
    const checkValue = () => {
        // name: 공백 유무 체크
        // studentId: 5자리 체크
        // phoneNumber: 010을 포함하고, 숫자만 포함하여 11자(01012341234)
        // verifyCode: 공백 유므 체크(확인 코드는 사용 여부 결정 후 진행)

        let {name, verifyCode, phoneNumber, studentId} = inputData

        let isError = false
        let errors = []
        // 공백 확인
        if (name === '' || name === undefined) { isError = true; errors.push('이름') }
        if (studentId === '' || studentId === undefined) { isError = true; errors.push('학번') }
        if (phoneNumber === '' || phoneNumber === undefined) { isError = true; errors.push('전화번호') }
        if (verifyCode === '' || verifyCode === undefined) { isError = true; errors.push('확인코드') }
        if (isError) {
            setErrorMsg({
                active: true,
                msg: `${errors.join(', ')}를 입력해주세요.`
            })
            return false
        }

        // 형식 확인
        if (studentId.length !== 5) { isError = true; errors.push('학번') }
        if (phoneNumber.length !== 11) { isError = true; errors.push('전화번호')}
        if (isError) {
            setErrorMsg({
                active: true,
                msg: `${errors.join(', ')} 항목이 옳바르지 않습니다.`
            })
            return false
        }
        console.log(errors)
        return true
    }
    const nextButton = () => {
        setErrorMsg({...errorMsg, active: false, msg: ''})
        let check = checkValue()
        if (!check) {
            return
        }
        setButtonText(
            <MoonLoader className={styles.loading} size={17} speedMultiplier={1} color="#000000" />
        )
        setButtonClick(true)
    }
    const [buttonClick, setButtonClick] = useState(false)
    const [buttonText, setButtonText] = useState('다음으로 →')
    const [inputData, setInputData] = useState({})
    return (
        <>
            <div className={styles.box}>
                <Header />
                <div className={styles.title}>
                    회원가입
                </div>
                <div className={styles.description}>
                    재학생 정보를 입력해주세요.
                </div>
                <div className={styles.space} />
                {(errorMsg.active)?(
                    <div className={styles.error}>
                        <IoInformationCircleSharp className={styles.icon} size={20} />
                        <div className={styles.text}>
                            {errorMsg.msg}
                        </div>
                    </div>
                ):undefined}
                <div className={styles.space} />
                <Inputs setInputData={setInputData} disabled={isDisabled}/>
                <div className={styles.space} />
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

export default Class