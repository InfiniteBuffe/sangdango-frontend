import styles from '@/styles/pages/services/Rental/Admin/Admin.module.css'
import { Box, Button, ThemeProvider, createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoBan } from 'react-icons/io5'
import { MdCancel, MdError, MdModeEdit } from 'react-icons/md'
import { PulseLoader } from 'react-spinners'
import { BottomSheet } from 'react-spring-bottom-sheet'

const List = (props) => {

    const url = (process.env.NEXT_PUBLIC_ENV === 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()
    const [rentalList, setRentalList] = useState([])
    const [loading, setLoading] = useState(true)
    const [bottomSheetStatus, setBottomSheetStatus] = useState({ detail: false })
    const [detailData, setDetailData] = useState({ studetnId: '', name: '', no: '', umbrellaName: '', notReturnedCount: '불러오는 중', notReturned: false })

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    })

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

    const changeCurrentRentalValue = (no, studentId, name, value) => {
        let data = {}
        data[name] = value
        let promise = axios({
            method: 'PATCH',
            url: url + '/api/rental/admin/list',
            withCredentials: true,
            data: { studentId: studentId, ...data }
        })
            .then(r => {
                let data = rentalList
                let detailData = {}
                data[no - 1][name] = value
                detailData[name] = value
                setRentalList(data)
                setDetailData(data => ({ ...data, ...detailData }))
            })
        toast.promise(
            promise,
            {
                loading: '저장 중...',
                success: '저장되었습니다',
                error: '오류가 발생했습니다',
            }
        );
    }

    const cancelRental = (studentId, name, no) => {
        let promise = axios({
            method: 'POST',
            url: url + '/api/rental/remove',
            data: {
                studentId: studentId,
                name: name,
            }
        })
            .then(r => {
                let data = rentalList
                delete data[no - 1]
                setRentalList(data)
                setDetailData({})
                setBottomSheetStatus(data => ({ ...data, detail: false }))
            })

        toast.promise(
            promise,
            {
                loading: '저장 중...',
                success: '처리되었습니다',
                error: '이미 취소되었습니다', // 사용자가 먼저 신청폼으로 취소한 경우
            }
        );
    }

    const addNotReturned = (studentId, no) => {
        let promise = axios({
            method: 'POST',
            url: url + '/api/rental/admin/notReturned',
            data: {
                studentId: studentId,
            }
        })
            .then(r => {
                setDetailData(data => ({ ...data, notReturned: true, notReturnedCount: r.data.data.notReturnedCount }))
                let data = rentalList
                data[no - 1].notReturned = true
                setRentalList(data)
                alert('장기미반납 1회 추가 및 미반납 등록이 완료되었습니다')
            })

        toast.promise(
            promise,
            {
                loading: '처리 중...',
                success: '완료되었습니다',
                error: '오류가 발생했습니다',
            }
        );
    }

    const getStudentNotReturnedCount = (studentId) => {

        axios({
            method: 'GET',
            url: url + '/api/rental/admin/notReturned',
            params: {
                studentId: studentId,
            }
        })
            .then(r => {
                setDetailData(data => ({ ...data, notReturnedCount: r.data.notReturnedCount }))
            })
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!router.isReady) return

        axios({
            method: 'GET',
            url: url + '/api/rental/admin/list',
            withCredentials: true,
        })
            .then(r => {
                setLoading(false)
                setRentalList([...r.data])
            })
    }, [router.isReady])

    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    대여자 명단 📋
                </div>
            </div>
            <table className={styles.rental_list} style={{ overflow: 'hidden' }}>
                <thead className={styles.rental_list_head}>
                    <tr>
                        <td className={styles.rental_list_no}>No</td>
                        <td>학번</td>
                        <td>이름</td>
                        <td>우산정보</td>
                        <td className={styles.rental_list_not_returned}>장기미반납</td>
                    </tr>
                </thead>
                <tbody>
                    {rentalList.map((data, key) => {
                        return (
                            <tr
                                onClick={() => {
                                    setDetailData({
                                        name: data.name,
                                        studentId: data.studentId,
                                        no: key + 1,
                                        umbrellaName: data.umbrellaName,
                                        notReturned: data.notReturned,
                                    })
                                    getStudentNotReturnedCount(data.studentId)
                                    setBottomSheetStatus(data => ({ ...data, detail: true }))
                                }}
                                key={key}
                                className={styles.rental_list_row}
                                id={data.notReturned ? styles.rental_list_row_not_returned : null}
                            >
                                <td>{key + 1}</td>
                                <td>{data.studentId}</td>
                                <td>{data.name}</td>
                                <td>{data.umbrellaName}</td>
                                <td>{data.notReturned ? <p className={styles.rental_list_row_detail_red}>예</p> : '아니요'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {loading && (
                <div className={styles.loading}>
                    <PulseLoader />
                    <div className={styles.text}>
                        불러오는 중
                    </div>
                </div>
            )}
            <div className={styles.bottom_space} />
            <BottomSheet open={bottomSheetStatus.detail}>
                <div className={styles.bottomSheetTitle}>
                    상세보기 🔍
                </div>
                <table className={styles.rental_list} id={styles.bottomSheetTable}>
                    <thead className={styles.rental_list_head}>
                        <tr>
                            <td className={styles.rental_list_no}>No</td>
                            <td>학번</td>
                            <td>이름</td>
                            <td>우산정보</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.rental_list_row}>
                            <td>{detailData.no}</td>
                            <td>{detailData.studentId}</td>
                            <td>{detailData.name}</td>
                            <td>{detailData.umbrellaName}</td>
                        </tr>
                    </tbody>
                </table>
                <table className={styles.rental_list} id={styles.bottomSheetTable}>
                    <thead className={styles.rental_list_head}>
                        <tr>
                            <td>현재 장기미반납 여부</td>
                            <td>장기미반납 누적 횟수</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.rental_list_row}>
                            <td className={detailData.notReturned ? styles.rental_list_row_detail_red : styles.rental_list_row_detail_blue}>{detailData.notReturned ? '예' : '아니요'}</td>
                            <td className={String(detailData.notReturnedCount) != '0' ? styles.rental_list_row_detail_red : styles.rental_list_row_detail_blue}>{detailData.notReturnedCount}</td>
                        </tr>
                    </tbody>
                </table>
                {/* 표에 학번에 저장된 장기미반납 횟수, 분실 횟수 표시되게 할 것  */}
                <div className={styles.bottomSheetButtonGroup}>
                    <div className={styles.button} onClick={() => {
                        let data = prompt('우산정보를 입력해주세요')
                        if (data == null) return toast.success('취소되었습니다')
                        changeCurrentRentalValue(detailData.no, detailData.studentId, 'umbrellaName', data)
                    }}>
                        <MdModeEdit size={16} className={styles.icon} />
                        <div className={styles.text}>
                            우산정보 수정
                        </div>
                    </div>
                    <div className={styles.button} onClick={() => {
                        cancelRental(detailData.studentId, detailData.name, detailData.no)
                    }}>
                        <MdCancel size={16} className={styles.icon} />
                        <div className={styles.text}>
                            대여취소 처리
                        </div>
                    </div>
                    <div className={styles.button} onClick={() => {
                        addNotReturned(detailData.studentId, detailData.no)
                    }}>
                        <IoBan size={16} className={styles.icon} />
                        <div className={styles.text}>
                            장기미반납 처리
                        </div>
                    </div>
                </div>
                <ThemeProvider theme={theme}>
                    <Box textAlign='center'>
                        <Button
                            fullWidth
                            style={{
                                height: '50px',
                                width: 'calc(100% - 60px)',
                                maxWidth: '750px',
                                marginTop: '20px',
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
                            onClick={() => setBottomSheetStatus(data => ({ ...data, detail: false }))}
                        >
                            닫기
                        </Button>
                    </Box>
                </ThemeProvider>
                <div className={styles.bottom_sheet_mobile} />
            </BottomSheet>
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

export default List