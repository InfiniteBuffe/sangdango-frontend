import styles from '@/styles/pages/services/Rental/Cancel/Cancel.module.css'
import Input from '@/components/Input'
import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { grey } from "@mui/material/colors"
import { MoonLoader, ScaleLoader, SyncLoader } from 'react-spinners'
import { BottomSheet } from 'react-spring-bottom-sheet'
import TwemojiFix from '@/components/TwemojiFix'

const Cancel = () => {
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const [currentInfo, setCurrentInfo] = useState({ count: '-', time: '', max: '0', using: '0', })
    const [quantityStyleId, setQuantityStyleId] = useState() // 아래 quantityState랑 상태 하나로 합쳐서 정리할 것.
    const [quantityState, setQuantityState] = useState()
    const [quantityLoading, setQuantityLoading] = useState(true)
    const [studentInfo, setStudentInfo] = useState({ studentId: '', name: '' })
    const [inputStatus, setInputStatus] = useState({})
    const [sheetError, setSheetError] = useState({ title: '', description: '' })
    const [inputError, setInputError] = useState({
        studentId: { error: false, msg: null },
        name: { error: false, msg: null }
    })
    const [bottomSheetStatus, setBottomSheetStatus] = useState({})
    const router = useRouter()
    useEffect(() => {

        if (!router.isReady) return

        axios({
            url: url + '/api/rental/current',
            method: 'GET',
        })
            .then(r => {
                if (r.status != 200) {
                    setCurrentInfo({ ...currentInfo, count: 'none', time: r.data.time })
                    return
                }
                let data = { ...currentInfo, count: r.data.remaining, time: r.data.time, max: r.data.max, using: r.data.count }
                setCurrentInfo(data)
                let quantityState = getNowCurrontCountState(data)
                setQuantityLoading(false)
                setQuantityState(quantityState)
                switch (quantityState) {
                    case 'max':
                        return setQuantityStyleId()
                    case 'good':
                        return setQuantityStyleId(styles.success)
                    case 'warning':
                        return setQuantityStyleId(styles.warning)
                    case 'danger':
                        return setQuantityStyleId(styles.danger)
                }
            })
    }, [])

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })

    const getNowCurrontCountState = (data) => {
        let max = Number(data.max)
        let using = Number(data.using)
        let rate = 100 - Math.round((using / max) * 100)
        if (rate == 100) {
            return 'max'
        }
        if (rate < 100 && rate >= 60) {
            return 'good'
        }
        if (rate < 60 && rate >= 30) {
            return 'warning'
        }
        if (rate < 30) {
            return 'danger'
        }
    }

    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }

    const verifyName = (text) => {
        const t = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
        const n = /[0-9]/g;
        text = text.replace(t, '')
        text = text.replace(n, '')
        if (text.length > 10) {
            return text.substring(0, 10)
        }
        return text
    }

    const addRental = (event) => {
        // event는 form에서 enter을 입력할 경우 값이 들어옴
        if (event) {
            event.preventDefault()
        }

        // 글자수 확인 및 빈칸 확인
        let sid = studentInfo.studentId
        let name = studentInfo.name
        let error = {}

        // 학번은 5자리 고정
        if (String(sid).length != 5) {
            error.sid = true
        }

        // 학번 유효성 검사 | 학년 검사
        if (String(sid)[0] == '0' || Number(String(sid)[0]) > 3) {
            error.sid = true
        }

        // 학번 유효성 검사 | 반 검사
        if (Number(String(sid).slice(1, 3)) > 15 || Number(String(sid).slice(1, 3)) == 0) { // 반은 최대 15반까지
            error.sid = true
        }

        // 학번 유효성 검사 | 번호 검사
        if (Number(String(sid).slice(3)) > 35 || Number(String(sid).slice(3)) == 0) { // 번호는 최대 35번까지
            error.sid = true
        }

        if (name.length < 2) { // 이름은 2글자 이상
            error.name = true
        }

        setInputError(prevState => ({
            ...prevState,
            studentId: { error: error.sid || false, msg: error.sid ? '잘못된 학번입니다' : null },
            name: { error: error.name || false, msg: error.name ? '이름을 다시 입력해주세요' : null }
        }));

        if (error.sid || error.name) {
            return
        }

        // inputStatus는 true 시 disabled={true} 됨.
        setInputStatus({ ...inputStatus, studentId: true, name: true, rentalConfirm: true })
        setBottomSheetStatus({ ...bottomSheetStatus, loading: true })

        axios({
            url: url + '/api/rental/remove',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: studentInfo.name,
                studentId: studentInfo.studentId
            }
        })
            .then(r => {
                setInputStatus(data => ({ ...data, studentId: false, name: false, rentalConfirm: false }))
                if (r.data.code == 'NOT_REGISTERED') {
                    setSheetError({ title: '신청 안함', description: '명부에 없는 사용자입니다' })
                    setBottomSheetStatus(data => ({ ...data, error: true, loading: false }))
                    setStudentInfo({name: '', studentId: ''})
                    return
                }
                let data = { ...currentInfo, count: r.data.remaining, time: r.data.time, using: r.data.rental }
                setCurrentInfo(data)
                setStudentInfo({ name: '', studentId: '' })
                setBottomSheetStatus(_data => ({ ..._data, loading: false, success: true }))
                console.log(data)
                let quantityState = getNowCurrontCountState(data)
                setQuantityState(quantityState)
                console.log(quantityState)
                switch (quantityState) {
                    case 'max':
                        return setQuantityStyleId()
                    case 'good':
                        return setQuantityStyleId(styles.success)
                    case 'warning':
                        return setQuantityStyleId(styles.warning)
                    case 'danger':
                        return setQuantityStyleId(styles.danger)
                }
            })
    }

    const sheetButton = (props) => {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Box textAlign='center'>
                        <Button
                            fullWidth
                            style={{
                                height: '50px',
                                width: 'calc(100% - 40px)',
                                marginBottom: '20px',
                                borderRadius: '20px',
                                color: 'white',
                                fontSize: '16px',
                                fontFamily: 'pretendard',
                                fontWeight: 600,
                            }}
                            variant="contained"
                            size="large"
                            color="dark"
                            type="submit"
                            onClick={props.onClick}
                        >
                            {props.name}
                        </Button>
                    </Box>
                </ThemeProvider>
            </>
        )
    }


    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    취소하기 ❌
                </div>
            </div>
            <div className={styles.now_quantity} id={quantityStyleId}>
                {quantityLoading && (
                    <>
                        <div className={styles.loading}>
                            불러오는 중...
                        </div>
                    </>
                )}
                {!quantityLoading && (
                    <>
                        <div className={styles.title}>
                            <div className={styles.name}>
                                잔여 수량
                            </div>
                            <div className={styles.timestamp}>
                                {currentInfo.time} 기준
                            </div>
                        </div>
                        <div className={styles.quantity}>
                            {currentInfo.count == 'none' && (
                                <>대여불가</>
                            )}
                            {currentInfo.count != 'none' && (
                                <>{currentInfo.count}개</>
                            )}
                        </div>
                    </>
                )}
            </div>
            <form onSubmit={addRental}>
                <Input
                    label='학번'
                    placeholder='학번 5자리를 입력하세요'
                    required={true}
                    onChange={(a) => {
                        let value = changeOnlyNum(a.target.value)
                        if (String(value).length > 5) return
                        setStudentInfo({ ...studentInfo, studentId: value })
                    }}
                    value={studentInfo.studentId}
                    disabled={inputStatus.studentId || false}
                    error={inputError.studentId.error || false}
                    errorMsg={inputError.studentId.msg || null}
                />
                <Input
                    label='이름'
                    placeholder='이름을 입력하세요'
                    required={true}
                    onChange={(a) => {
                        let value = verifyName(a.target.value) // 최대 이름 길이는 10자 까지 (verifyName 함수에 설정됨)
                        setStudentInfo({ ...studentInfo, name: value })
                    }}
                    value={studentInfo.name}
                    disabled={inputStatus.name || false}
                    error={inputError.name.error || false}
                    errorMsg={inputError.name.msg || null}
                />
                <ThemeProvider theme={theme}>
                    <Box textAlign='center'>
                        <Button
                            fullWidth
                            style={{
                                height: '50px',
                                width: 'calc(100% - 60px)',
                                maxWidth: '750px',
                                marginTop: '30px',
                                borderRadius: '20px',
                                color: 'white',
                                fontSize: '16px',
                                fontFamily: 'pretendard',
                                fontWeight: 600,
                            }}
                            variant="contained"
                            size="large"
                            color="dark"
                            type="submit"
                            onClick={addRental}
                            disabled={inputStatus.rentalConfirm || false}
                        >
                            {!inputStatus.rentalConfirm && (
                                <>대여 취소하기</>
                            )}
                            {inputStatus.rentalConfirm && (
                                <MoonLoader size={17} speedMultiplier={1} color="#000000" />
                            )}
                        </Button>
                    </Box>
                </ThemeProvider>
            </form>

            <BottomSheet open={bottomSheetStatus.loading}>
                <SyncLoader className={styles.sheet_loading_circle} size={17} speedMultiplier={0.75} color="#A0D468" />
                <div className={styles.sheet_title}>
                    대여 취소 중
                </div>
                <div className={styles.sheet_description}>
                    잠시만 기다려 주세요.
                </div>
                <div className={styles.bottom_sheet_mobile} />
            </BottomSheet>
            <BottomSheet onDismiss={() => setBottomSheetStatus(data => ({ ...data, error: false }))} open={bottomSheetStatus.error}>
                <TwemojiFix options={{ className: styles.emoji_font }}>❌</TwemojiFix>
                <div className={styles.sheet_title}>
                    {sheetError.title}
                </div>
                <div className={styles.sheet_description}>
                    {sheetError.description}
                </div>
                {sheetButton({ name: '닫기', onClick: () => setBottomSheetStatus(data => ({ ...data, error: false })) })}
                <div className={styles.bottom_sheet_mobile} />
            </BottomSheet>
            <BottomSheet onDismiss={() => setBottomSheetStatus(data => ({ ...data, success: false }))} open={bottomSheetStatus.success}>
                <TwemojiFix options={{ className: styles.emoji_font }}>✅</TwemojiFix>
                <div className={styles.sheet_title}>
                    취소 완료
                </div>
                <div className={styles.sheet_description}>
                    대여가 취소되었습니다
                </div>
                {sheetButton({ name: '닫기', onClick: () => setBottomSheetStatus(data => ({ ...data, success: false })) })}
                <div className={styles.bottom_sheet_mobile} />
            </BottomSheet>
        </>
    )
}

export default Cancel