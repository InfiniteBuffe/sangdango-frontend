import Input from '@/components/Input'
import styles from '@/styles/pages/services/Rental/Admin/Admin.module.css'
import { useState } from 'react'
import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import { MdError } from 'react-icons/md'

const Return = (props) => {

    const router = useRouter()
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const [inputData, setInputData] = useState({ studentId: '' })
    const [buttonStatus, setButtonStatus] = useState({ find: true })
    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })

    const setReturn = () => {
        let studentId = inputData.studentId

        if (String(studentId) == '') {
            toast.error('학번을 입력해주세요')
            return
        }

        setButtonStatus(data => ({ ...data, find: false }))

        axios({
            method: 'POST',
            url: url + '/api/rental/admin/return',
            data: {
                studentId: studentId,
            }
        })
            .then(r => {
                setButtonStatus(data => ({ ...data, find: true }))

                if (r.data.code == 'NO_RENTAL') {
                    toast.error('대여 명단에 없습니다')
                    return
                }

                if (r.data.code == 'RETURN_COMPLETED') {
                    toast.success('반납이 처리되었습니다')
                    setInputData(data => ({ ...data, studentId: '' }))
                    return
                }
            })

    }

    if (props.session == null) {
        return (
            <>
                <div className={styles.not_admin}>
                    <MdError size={40} />
                    <div className={styles.text}>
                        로그인이 필요합니다
                        <br />
                        로그인 후 다시 시도해주세요
                    </div>
                    <div onClick={() => router.push(`/auth/login?redirect=${url}/service/rental/admin/list`)} className={styles.login_button} >
                        로그인
                    </div>
                </div>
            </>
        )
    }

    if (!props.session.user.admin) {
        return (
            <>
                <div className={styles.not_admin}>
                    <MdError size={40} />
                    <div className={styles.text}>
                        권한이 없습니다
                        <br />
                        관리자에게 문의하세요
                    </div>
                    <div className={styles.user}>
                        당신의 식별번호: {props.session.user.id}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    우산반납 등록 ☂️
                </div>
            </div>

            <Input
                value={inputData.studentId}
                onChange={(a) => {
                    let value = changeOnlyNum(a.target.value)
                    if (String(value).length > 5) return
                    setInputData(data => ({ ...data, studentId: value }))
                }}
                placeholder='학번을 입력해주세요'
                label='반납 처리 할 학번'
                required={true}
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
                        onClick={setReturn}
                        disabled={!buttonStatus.find}
                    >
                        {buttonStatus.find ? '반납 처리하기' : '처리하는 중...'}
                    </Button>
                </Box>
            </ThemeProvider>
        </>
    )
}

export const getServerSideProps = async (context) => {
    return {
        props: {
            session: await getSession(context),
        },
    }
}
export default Return