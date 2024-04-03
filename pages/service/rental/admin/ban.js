import styles from '@/styles/pages/services/Rental/Admin/Admin.module.css'
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import {createTheme, FormControlLabel} from "@mui/material";
import {grey} from "@mui/material/colors";
import {MdError} from "react-icons/md";
import MenuTitle from "@/components/MenuTitle";
import Input from "@/components/Input";
import {useState} from "react";
import MuiButton from "@/components/MuiButton";

const Ban = (props) => {
    const router = useRouter()
    const url = (process.env.NEXT_PUBLIC_ENV === 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
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
            <MenuTitle text={'대여금지 학번 관리 ⚙️'}/>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/ban/add')
            }}>
                <div className={styles.setting_text}>
                    대여금지 학번 등록
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/ban/cancel')
            }}>
                <div className={styles.setting_text}>
                    대여금지 학번 취소
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/ban/list')
            }}>
                <div className={styles.setting_text}>
                    대여금지 학번 명단
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            {/*    <Input*/}
            {/*        required={true}*/}
            {/*        label={'학번'}*/}
            {/*        placeholder={'여기에 학번을 입력하세요'}*/}
            {/*        onChange={(e)=>{*/}
            {/*            let value = changeOnlyNum(e.target.value)*/}
            {/*            if (String(value).length > 5) return*/}
            {/*            setInputData(data=>({...data, studentId: { ...data.studentId, value: value }}))*/}
            {/*        }}*/}
            {/*        value={inputData.studentId.value}*/}
            {/*    />*/}
            {/*    <MuiButton>대여 금지 처리하기</MuiButton>*/}
            {/*    <div className={styles.space} />*/}
            {/*    <MenuTitle text={'대여 금지 해제 ✅'} />*/}
            {/*    <Input*/}
            {/*        required={true}*/}
            {/*        label={'학번'}*/}
            {/*        placeholder={'여기에 학번을 입력하세요'}*/}
            {/*        onChange={(e)=>{*/}
            {/*            let value = changeOnlyNum(e.target.value)*/}
            {/*            if (String(value).length > 5) return*/}
            {/*            setInputData(data=>({...data, studentId: { ...data.studentId, value: value }}))*/}
            {/*        }}*/}
            {/*        value={inputData.studentId.value}*/}
            {/*    />*/}
            {/*    <MuiButton>대여 금지 해제 처리하기</MuiButton>*/}
            {/*    <div className={styles.space} />*/}
            {/*    <MenuTitle text={'장기미반납 학생 명단 📝'} />*/}
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
export default Ban