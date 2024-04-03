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
import BottomSheetTitle from "@/components/BottomSheetTitle";

const List = (props) => {

    const url = (process.env.NEXT_PUBLIC_ENV === 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()
    const [banList, setBanList] = useState([])

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (!router.isReady) return

            axios({
                method: 'GET',
                url: url + '/api/rental/admin/ban',
                params: {
                    all: true,
                }
            })
                .then(r=>{
                    if (r.data.code === 'PROCESSING_COMPLETED') {
                        setBanList(r.data.data)
                    } else {
                        toast.error('오류가 발생하였습니다')
                    }
                })

    }, [router.isReady])

    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    대여금지 학번 명단 📋
                </div>
            </div>
            <table className={styles.rental_list} style={{ overflow: 'hidden' }}>
                <thead className={styles.rental_list_head}>
                <tr>
                    <td className={styles.rental_list_no}>No</td>
                    <td>학번</td>
                    <td>장기미반납 누적 횟수</td>
                    <td>대여금지 처리 일시</td>
                </tr>
                </thead>
                <tbody>
                {
                    banList.map((data, key)=>(
                        <tr key={key}>
                            <td>{key+1}</td>
                            <td>{data.studentId}</td>
                            <td>{data.notReturnedCount}</td>
                            <td>{data.rentalBanLatestDate}</td>
                        </tr>
                    ))
                }
                {banList.length === 0 && (
                    <tr>
                        <td className={styles.rental_list_no_data} colSpan={4}>
                            데이터가 없습니다.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
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