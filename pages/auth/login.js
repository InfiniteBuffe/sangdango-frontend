import Header from '@/components/Header'
import styles from '@/styles/pages/auth/Login/Login.module.css'
import { TextField, Button, createTheme, ThemeProvider, InputAdornment, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import Box from '@mui/material/Box';

const Login = () => {

    const theme = createTheme({
        palette: {
            dark: {
                main: grey[900]
            }
        }
    })
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <Header />
            <div className={styles.box}>
                <div className={styles.login}>
                    <div className={styles.title}>
                        로그인
                    </div>
                    <div className={styles.title_info}>
                        상당고 학생정보망에 로그인합니다.
                    </div>
                    <div className={styles.space} />
                    <div className={styles.space} />
                    <ThemeProvider theme={theme}>
                        <TextField
                            fullWidth
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 }, readOnly: false }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='dark'
                            label="아이디"
                            variant="outlined"
                        />
                        <div className={styles.space} />
                        <TextField
                            fullWidth
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                readOnly: false,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='dark'
                            type={showPassword ? "text" : "password"}
                            label="비밀번호"
                            variant="outlined"
                        />
                        <div className={styles.space} />
                        <Button
                            fullWidth
                            style={{ fontFamily: 'pretendard', fontWeight: 600, height: '56px', fontSize: '18px', color: 'white', borderRadius: '20px' }}
                            variant="contained"
                            size="large"
                            color="dark"
                        >
                            로그인
                        </Button>
                        <Box textAlign='center' style={{marginTop:'15px',marginBottom:'-15px'}}>
                            <Button
                                color='dark'
                                variant="text"
                                style={{
                                    fontFamily: 'pretendard',
                                    fontWeight: 500,
                                    margin: 'auto',
                                }}>
                                계정이 없으신가요?
                            </Button>
                        </Box>
                    </ThemeProvider>
                </div>
            </div>
        </>
    )
}

export default Login