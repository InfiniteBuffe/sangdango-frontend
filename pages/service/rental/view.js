import Input from '@/components/Input'
import MenuTitle from '@/components/MenuTitle'
import styles from '@/styles/pages/services/Rental/View/View.module.css'
import { grey } from '@mui/material/colors'
import { use, useState } from 'react'
import { Box, Button, Menu, ThemeProvider, createTheme } from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'

const View = () => {
    const [inputData, setInputData] = useState({ studentId: { value: '', disabled: false, error: false, errorMsg: '잘못된 학번입니다' } })
    const [rentalLog, setRentalLog] = useState([])
    const [rentalDataNotFound, setRentalDataNotFound] = useState(false)
    const [rentalLogFindButtonNotClick, setRentalLogFindButtonNotClick] = useState(true)
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })
    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }

    const find = (e) => {
        if (e) {
            e.preventDefault()
        }

        setInputData(data => ({ ...data, studentId: { ...data.studentId, disabled: true } }))

        let sid = inputData.studentId.value
        let error = false

        // 학번은 5자리 고정
        if (String(sid).length != 5) {
            error = true
        }

        // 학번 유효성 검사 | 학년 검사
        if (String(sid)[0] == '0' || Number(String(sid)[0]) > 3) {
            error = true
        }

        // 학번 유효성 검사 | 반 검사
        if (Number(String(sid).slice(1, 3)) > 15 || Number(String(sid).slice(1, 3)) == 0) { // 반은 최대 15반까지
            error = true
        }

        // 학번 유효성 검사 | 번호 검사
        if (Number(String(sid).slice(3)) > 35 || Number(String(sid).slice(3)) == 0) { // 번호는 최대 35번까지
            error = true
        }

        if (error) {
            setInputData(data => ({ ...data, studentId: { ...data.studentId, disabled: false, error: true } }))
            return
        } else {
            setInputData(data => ({ ...data, studentId: { ...data.studentId, error: false } }))
        }

        setRentalLog([])

        let promise = axios({
            method: 'GET',
            url: url + '/api/rental/log',
            params: {
                studentId: inputData.studentId.value
            }
        })
            .then(r => {
                setRentalLogFindButtonNotClick(false)
                setInputData(data => ({ ...data, studentId: { ...data.studentId, disabled: false, value: '' } }))
                if ([...r.data.data].length == 0) {
                    setRentalDataNotFound(true)
                    setRentalLog([])
                    return
                }
                setRentalLog(r.data.data)
            })

        toast.promise(
            promise,
            {
                loading: '조회 중...',
                success: '조회가 완료되었습니다',
                error: '오류가 발생했습니다',
            }
        )
        return

    }

    return (
        <>
            <MenuTitle text={'조회하기 🔍'} />
            <form onSubmit={(e) => find(e)}>
                <Input
                    label='학번'
                    placeholder='학번 5자리를 입력하세요'
                    required={true}
                    onChange={(a) => {
                        let value = changeOnlyNum(a.target.value)
                        if (String(value).length > 5) return
                        let _data = inputData.studentId
                        _data.value = value
                        setInputData(data => ({ ...data, studentId: _data }))
                    }}
                    value={inputData.studentId.value}
                    disabled={inputData.studentId.disabled}
                    error={inputData.studentId.error}
                    errorMsg={inputData.studentId.errorMsg}
                />
                <ThemeProvider theme={theme}>
                    <Box textAlign='center'>
                        <Button
                            fullWidth
                            style={{
                                height: '50px',
                                width: 'calc(100% - 60px)',
                                maxWidth: '750px',
                                marginTop: '20px',
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
                            onClick={find}
                            disabled={inputData.studentId.disabled}
                        >
                            {!inputData.studentId.disabled ? '기록 조회하기' : '조회 중...'}
                        </Button>
                    </Box>
                </ThemeProvider>
            </form>
            <div className={styles.space} />
            <MenuTitle
                text='기록 확인 📝'
                description="위 조회하기 🔍 에서 기록 조회하기를 누르면 아래 표에 출력됩니다"
            />
            <table className={styles.rental_list}>
                <thead className={styles.rental_list_head}>
                    <tr>
                        <td className={styles.rental_list_no}>No</td>
                        <td>학번</td>
                        <td>내용</td>
                        <td>시간</td>
                    </tr>
                </thead>
                <tbody>
                    {rentalLogFindButtonNotClick && (
                        <tr>
                            <td className={styles.rental_list_no_data} colSpan={4}>
                                버튼을 눌러 조회하면 여기에 표시됩니다
                            </td>
                        </tr>
                    )}
                    {!rentalLogFindButtonNotClick && rentalDataNotFound && (
                        <tr>
                            <td className={styles.rental_list_no_data} colSpan={4}>
                                {inputData.studentId.value} 학번으로 조회된 데이터가 없습니다
                            </td>
                        </tr>
                    )}
                    {!rentalLogFindButtonNotClick && !rentalDataNotFound && rentalLog.map((data, key) => {
                        return (
                            <tr
                                key={key}
                                className={styles.rental_list_row}
                            >
                                <td>{key + 1}</td>
                                <td>{data.studentId}</td>
                                <td>{data.type}</td>
                                <td>{data.createdAt}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className={styles.space} />
        </>
    )
}

export default View