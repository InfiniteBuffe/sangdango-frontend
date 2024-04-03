import styles from '@/styles/pages/services/Rental/Admin/Admin.module.css'
import {getSession} from "next-auth/react";
import {MdError} from "react-icons/md";
import MenuTitle from "@/components/MenuTitle";
import Input from "@/components/Input";
import MuiButton from "@/components/MuiButton";
import {useState} from "react";
import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import {changeOnlyNum} from "@/components/function/changeOnlyNum";
import {checkStudentId} from "@/components/function/checkStudentId";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/router";

const Add = (props) => {
    const url = (process.env.NEXT_PUBLIC_ENV === 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router=useRouter()
    const [inputData, setInputData] = useState({studentId: {value: '', error: false, errorMsg: '잘못된 학번입니다', disabled: false}})
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
                    <MdError size={40}/>
                    <div className={styles.text}>
                        로그인이 필요합니다
                        <br/>
                        로그인 후 다시 시도해주세요
                    </div>
                    <div onClick={() => router.push(`/auth/login?redirect=${url}/service/rental/admin/list`)}
                         className={styles.login_button}>
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
                    <MdError size={40}/>
                    <div className={styles.text}>
                        권한이 없습니다
                        <br/>
                        관리자에게 문의하세요
                    </div>
                    <div className={styles.user}>
                        당신의 식별번호: {props.session.user.id}
                    </div>
                </div>
            </>
        )
    }

    const setRentalBan = () => {
        setInputData(data => ({...data, studentId: {...data.studentId, error: false, disabled: true}}))

        let check = checkStudentId(inputData.studentId.value)
        if (!check) {
            setInputData(data => ({...data, studentId: {...data.studentId, error: true, disabled: false}}))
            toast.error('올바르지 않은 학번입니다')
            return
        }

        let promise = axios({
            method: 'PATCH',
            url: url + '/api/rental/admin/ban',
            data: {
                studentId: inputData.studentId.value,
                ban: true
            }
        })
            .then(r => {
                let {code} = r.data
                if (code === 'RENTAL_BAN_COMPLETED') {
                    setInputData(data=>({...data, studentId: { ...data.studentId, value: '', disabled: false}}))
                }
            })

        toast.promise(
            promise,
            {
                loading: '처리 중...',
                success: '처리되었습니다',
                error: '오류가 발생했습니다',
            }
        )
    }

    return (
        <>
            <MenuTitle text={'대여금지 학번 등록 🚫'}/>
            <Input
                required={true}
                label={'학번'}
                placeholder={'여기에 학번을 입력하세요'}
                onChange={(e) => {
                    let value = changeOnlyNum(e.target.value)
                    if (String(value).length > 5) return
                    setInputData(data => ({...data, studentId: {...data.studentId, value: value}}))
                }}
                value={inputData.studentId.value}
                error={inputData.studentId.error}
                errorMsg={inputData.studentId.errorMsg}
            />
            <MuiButton
                onClick={setRentalBan}
                disabled={inputData.studentId.disabled}
            >대여 금지 처리하기</MuiButton>
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
export default Add