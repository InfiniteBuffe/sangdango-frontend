import Input from '@/components/Input'
import styles from '@/styles/pages/services/Rental/Add/Add.module.css'
import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { grey } from "@mui/material/colors"

const Add = () => {
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const [currentInfo, setCurrentInfo] = useState({ count: '-', time: '', max: '0', using: '0', })
    const [quantityStyleId, setQuantityStyleId] = useState()
    const [quantityState, setQuantityState] = useState()
    const [quantityLoading, setQuantityLoading] = useState(true)
    const [studentInfo, setStudentInfo] = useState({ studentId: '', name: '' })
    const [inputStatus, setInputStatus] = useState({})
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
                let data = { ...currentInfo, count: Number(r.data.max) - Number(r.data.count), time: r.data.time, max: r.data.max, using: r.data.count }
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

    return (
        <>
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
                    // onClick={nextButton}
                    // disabled={buttonClick}
                    >
                        우산 대여하기
                    </Button>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Add