import styles from '@/styles/pages/auth/join/Identity/Identity.module.css'
import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";
import Header from "@/components/Header";
import {useState} from "react";

const Identity = () => {
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900],
            },
        },
    });

    const [identity, setIdentity] = useState({
        id: '',
        password: '',
        retype_password: '',
    })

    return (
        <>
            <div className={styles.box}>
                <Header />
                <div className={styles.title}>
                    회원가입
                </div>
                <div className={styles.description}>
                    사용하실 아이디와 비밀번호를 입력하세요.
                </div>
            </div>
        </>
    )
}

export default Identity