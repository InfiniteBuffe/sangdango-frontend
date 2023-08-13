import {createTheme, TextField, ThemeProvider} from "@mui/material";
import styles from "@/styles/components/join/Inputs/Inputs.module.css";
import {grey} from "@mui/material/colors";
import {useState} from "react";

const Inputs = (props) => {

    const changeOnlyNum = (text) => {
        let regex =  /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }
    let _info = {
        studentId: '',
        name: '',
        phoneNumber: '',
        verifyCode: '',
    }
    const [info, setInfo] = useState(_info)
    const changeValue = (name, value, type) => {
        let data = {...info}
        data[name] = value
        if (type == 'number') {
            data[name] = changeOnlyNum(value)
        }
        setInfo(data)
        props.setInputData(data)
    }

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })

    return (
        <>
            <ThemeProvider theme={theme}>
                <TextField
                    required
                    fullWidth
                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: false }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    color='dark'
                    label="학번"
                    variant="outlined"
                    helperText="예) 1학년 1반 35번 → 10135 (5자리 형태로 입력)"
                    FormHelperTextProps={{
                        className: styles.helper
                    }}
                    onChange={(a)=>changeValue('studentId', a.target.value, 'number')}
                    value={info.studentId}
                    disabled={props.disabled}
                />
                <div className={styles.space} />
                <TextField
                    required
                    fullWidth
                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: false }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    color='dark'
                    label="이름"
                    variant="outlined"
                    onChange={(a)=>changeValue('name', a.target.value)}
                    value={info.name}
                    disabled={props.disabled}
                />
                <div className={styles.space} />
                <TextField
                    required
                    fullWidth
                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: false }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    color='dark'
                    label="전화번호(휴대폰)"
                    variant="outlined"
                    onChange={(a)=>changeValue('phoneNumber', a.target.value, 'number')}
                    value={info.phoneNumber}
                    disabled={props.disabled}
                />
                <div className={styles.space} />
                <TextField
                    required
                    fullWidth
                    InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: false }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                    color='dark'
                    label="확인코드"
                    variant="outlined"
                    helperText="가입 진행을 위해 지급된 코드 입력"
                    FormHelperTextProps={{
                        className: styles.helper
                    }}
                    onChange={(a)=>changeValue('verifyCode', a.target.value)}
                    value={info.verifyCode}
                    disabled={props.disabled}
                />
            </ThemeProvider>
        </>
    )
}

export default Inputs