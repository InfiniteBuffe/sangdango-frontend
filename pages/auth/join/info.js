import styles from '@/styles/pages/auth/join/Info/Info.module.css'
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {useEffect, useState} from "react";
import { getCookies } from 'cookies-next';
import axios from "axios";
import {useRouter} from "next/router";
import {
    Button,
    createTheme,
    FormControl, FormControlLabel, FormGroup, FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment, InputLabel, MenuItem, Radio,
    RadioGroup, Select, Stack,
    TextField,
    ThemeProvider, ToggleButtonGroup
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {grey} from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from "@mui/material/Checkbox";

const Info = () => {

    const [loadingVisible, setLoadingVisible] = useState(false) // true
    const router = useRouter()
    const theme = createTheme({
        palette: {
            dark: {
                main: grey[600]
            },
            black: {
                main: grey[900]
            }
        }
    })

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const handleClickShowRetypePassword = () => setShowRetypePassword(!showRetypePassword);
    const handleMouseDownRetypePassword = () => setShowRetypePassword(!showRetypePassword);

    const [idError, setIdError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [retypePasswordError, setRetypePasswordError] = useState(false)

    const [lastCheck, setLastCheck] = useState(false)

    const idCheck = (id) => {
        if (userInfo.id == '') return
        let regExp = /^[a-z]+[a-z0-9]{5,20}$/g;
        let res = regExp.test(id);
        if (res) {
            setIdError(false)
        } else {
            setIdError(true)
        }
    }
    const passwordCheck = (pw) => {
        if (userInfo.password == '') return
        let regExp = /^(?=.*[a-zA-z])(?=.*[0-9]).{8,16}$/;
        let res = regExp.test(pw);
        if (res) {
            setPasswordError(false)
        } else {
            setPasswordError(true)
        }
    }
    const retypePasswordCheck = (pw) => {
        if (userInfo.retype_password == '') return
        if (userInfo.password == userInfo.retype_password) {
            setRetypePasswordError(false)
        } else {
            setRetypePasswordError(true)
        }
    }
    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
        retype_password: '',
        name: '',
        gender: '',
        grade: '',
        class: '',
        class_number: '',
        type: '', // teacher, student
    })

    const [nextButtonActive, setNextButtonActive] = useState(false)
    const nextButton = () => {

    }

    useEffect(()=>{

        //     axios({
        //         url: '/api/verify/join/check',
        //         withCredentials: true,
        //     })
        //         .then(r=>{
        //             if(r.data.verify) {
        //                 setLoadingVisible(false)
        //             } else {
        //                 console.log(r.data)
        //                 router.push('/auth/join')
        //             }
        //         })
    }, [])

    useEffect(()=>{
        idCheck(userInfo.id)
        passwordCheck(userInfo.password)
        retypePasswordCheck(userInfo.retype_password)
    }, [userInfo])

    useEffect(()=>{
        const name = userInfo.name
        const number = userInfo.class_number
        if ( idError || passwordError || retypePasswordError ) {
            setNextButtonActive(false)
            return
        }
        if ( name === '' ) return setNextButtonActive(false)
        if ( userInfo.class === '' ) return setNextButtonActive(false)
        if ( number === '' || number === 0 || number > 40 || number < 0) return setNextButtonActive(false)
        if ( userInfo.gender === '' ) return setNextButtonActive(false)
        if ( userInfo.type === '' ) return setNextButtonActive(false)
        if ( userInfo.grade === '' ) return setNextButtonActive(false)
        if ( lastCheck === false ) return setNextButtonActive(false)
        setNextButtonActive(true)
    }, [userInfo, idError, passwordError, retypePasswordError, lastCheck])

    return (
        <>
            <Header />
            <Loading visible={loadingVisible} />
            <div className={styles.box}>
                <div className={styles.title}>????????????</div>
                <div className={styles.title_info}>???????????? ???????????? ?????? ????????? ???????????????.</div>
                <div className={styles.space} />
                <div className={styles.terms_title}>
                    <span id={styles.terms_light}>?????? ????????? ??????</span>
                    <br />
                    <span id={styles.terms_highlight}>?????? ??????</span>??? ???????????????.
                </div>
                <div className={styles.space} />
                <ThemeProvider theme={theme}>
                    <FormControl fullWidth>
                        <TextField
                            required
                            focused
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                readOnly: false,
                            }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='dark'
                            type='text'
                            label="?????????"
                            variant="standard"
                            onChange={(data)=>setUserInfo({...userInfo, id: data.target.value})}
                            value={userInfo.id}
                            error={idError}
                        />
                        <FormHelperText style={{ fontFamily: 'pretendard', fontWeight: 500, marginLeft: 0 }}>5~20?????? ?????? ?????????, ????????? ????????????(_),(-)??? ?????? ???????????????.</FormHelperText>
                    </FormControl>
                    <div className={styles.space} />
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            focused
                            required
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
                            label="????????????"
                            variant="standard"
                            onChange={(data)=>setUserInfo({...userInfo, password: data.target.value})}
                            value={userInfo.password}
                            error={passwordError}
                        />
                        <FormHelperText style={{ fontFamily: 'pretendard', fontWeight: 500, marginLeft: 0 }}>8~16?????? ??????, ????????? ?????? ?????? 1??? ?????? ??????, ???????????? ?????? ???????????????.</FormHelperText>
                    </FormControl>
                    <div className={styles.space} />
                    <FormControl fullWidth>
                        <TextField
                            fullWidth
                            focused
                            required
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                readOnly: false,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowRetypePassword}
                                            onMouseDown={handleMouseDownRetypePassword}
                                        >
                                            {showRetypePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='dark'
                            type={showRetypePassword ? "text" : "password"}
                            label="???????????? ?????????"
                            variant="standard"
                            onChange={(data)=>setUserInfo({...userInfo, retype_password: data.target.value})}
                            value={userInfo.retype_password}
                            error={retypePasswordError}
                        />
                    </FormControl>
                    <div className={styles.space} />
                    <TextField
                        required
                        fullWidth
                        focused
                        InputProps={{
                            style: { fontFamily: 'pretendard', fontWeight: 500 },
                            readOnly: false,
                        }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='dark'
                        type='text'
                        label="??????"
                        variant="standard"
                        onChange={(data)=>setUserInfo({...userInfo, name: data.target.value})}
                        value={userInfo.name}
                    />
                    <div className={styles.space} />
                    <FormControl
                        required
                        onChange={(data)=>{setUserInfo({...userInfo, gender: data.target.value})}}
                        value={userInfo.gender}
                    >
                        <FormLabel id="gender" color='dark' style={{fontFamily:'pretendard', fontWeight: 500}}>??????</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="gender"
                            name="row-radio-buttons-group"
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        >
                            <FormControlLabel value="male" control={<Radio color='black'/>} label={(<div
                                style={{fontFamily: 'pretendard', fontWeight: 500}}>??????</div>)} />
                            <FormControlLabel value="female" control={<Radio color='black'/>} label={(<div
                                style={{fontFamily: 'pretendard', fontWeight: 500}}>??????</div>)} />
                        </RadioGroup>
                    </FormControl>
                    <div className={styles.space} />
                    <FormControl
                        required
                        onChange={(data)=>{setUserInfo({...userInfo, type: data.target.value})}}
                        value={userInfo.type}
                    >
                        <FormLabel id="type" color='dark' style={{fontFamily:'pretendard', fontWeight: 500}}>?????? ??????</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="type"
                            name="row-radio-buttons-group"
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        >
                            <FormControlLabel value="student" control={<Radio color='black'/>} label={(<div
                                style={{fontFamily: 'pretendard', fontWeight: 500}}>??????</div>)} />
                            <FormControlLabel value="teacher" control={<Radio color='black'/>} label={(<div
                                style={{fontFamily: 'pretendard', fontWeight: 500}}>?????????</div>)} />
                        </RadioGroup>
                    </FormControl>
                    {userInfo.type=='student'?(
                        <>
                            <div className={styles.space} />
                            <FormControl fullWidth required focused variant="standard">
                                <InputLabel color='black' style={{fontFamily: 'pretendard', fontWeight: 500}} id="grade">??????</InputLabel>
                                <Select
                                    color='black'
                                    labelId="grade"
                                    id="grade"
                                    value={userInfo.grade}
                                    label="??????"
                                    onChange={(data)=>setUserInfo({...userInfo, grade: data.target.value})}
                                    style={{fontFamily: 'pretendard', fontWeight: 500}}
                                >
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={1}>1??????</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={2}>2??????</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={3}>3??????</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={styles.space} />
                            <FormControl fullWidth required focused variant="standard">
                                <InputLabel color='black' style={{fontFamily: 'pretendard', fontWeight: 500}} id="grade">??????</InputLabel>
                                <Select
                                    color='black'
                                    labelId="grade"
                                    id="grade"
                                    value={userInfo.class}
                                    label="???"
                                    onChange={(data)=>setUserInfo({...userInfo, class: data.target.value})}
                                    style={{fontFamily: 'pretendard', fontWeight: 500}}
                                >
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={1}>1???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={2}>2???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={3}>3???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={4}>4???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={5}>5???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={6}>6???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={7}>7???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={8}>8???</MenuItem>
                                    <MenuItem style={{fontFamily: 'pretendard', fontWeight: 500}} value={9}>9???</MenuItem>
                                </Select>
                            </FormControl>
                            <div className={styles.space} />
                            <TextField
                                required
                                fullWidth
                                focused
                                InputProps={{
                                    style: { fontFamily: 'pretendard', fontWeight: 500 },
                                    readOnly: false,
                                    endAdornment: (
                                        <div style={{fontFamily: 'pretendard', fontWeight: 500}}>
                                            ???
                                        </div>
                                    ),
                                    min: 1,
                                    max: 50,
                                }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                color='dark'
                                type='number'
                                label="??????"
                                variant="standard"
                                onChange={(data)=>setUserInfo({...userInfo, class_number: data.target.value})}
                                value={userInfo.class_number}
                            />
                        </>
                    ):(undefined)}
                </ThemeProvider>
                {userInfo.type == 'student'?(
                    <>
                        <div className={styles.space} />
                        <div className={styles.student_info_title}>
                            ????????? ?????? ??????
                        </div>
                        <div className={styles.space} />
                        <div className={styles.student_info}>
                            ?????????{' '}
                            <span style={{fontWeight:600}}>{userInfo.name}</span>??????, ?????????{' '}
                            <span style={{fontWeight:600}}>{userInfo.grade}0{userInfo.class}{userInfo.class_number}</span>??? ???????????????.
                        </div>
                        <div className={styles.space} />
                    </>
                ):(undefined)}
                {userInfo.type == 'teacher'?(
                    <>
                        <div className={styles.space} />
                        <div className={styles.student_info_title}>
                            ????????? ?????? ??????
                        </div>
                        <div className={styles.space} />
                        <div className={styles.student_info}>
                            ?????????{' '}
                            <span style={{fontWeight:600}}>{userInfo.name}</span>??????, ?????? ???????????? ????????????{' '}
                            <span style={{fontWeight:600}}>?????????</span> ?????????.
                        </div>
                        <div className={styles.space} />
                    </>
                ):(undefined)}
                {(userInfo.type == 'student' || userInfo.type == 'teacher')?(
                    <>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={lastCheck}
                                        onClick={() => setLastCheck(!lastCheck)}
                                        sx={{
                                            color: grey[900],
                                            '&.Mui-checked': {
                                                color: grey[900],
                                            },
                                        }}
                                    />
                                }
                                style={{ fontFamily: 'pretendard' }}
                                label={
                                    <div className={styles.label}>
                                        ????????? ????????????????????? ?????? ?????? ?????? ?????????, ??? ????????? ???????????????.{' '}
                                        <span className={styles.require}>(??????)</span>
                                    </div>
                                }
                            />
                        </FormGroup>
                        <div className={styles.space} />
                    </>
                ):(undefined)}
                {nextButtonActive?(
                    <>
                        <ThemeProvider theme={theme}>
                            <Button
                                fullWidth
                                style={{
                                    fontFamily: 'pretendard',
                                    fontWeight: 600,
                                    height: '60px',
                                    fontSize: '16px',
                                    width: '100%',
                                    color: 'white',
                                    borderRadius: '20px',
                                }}
                                variant="contained"
                                size="large"
                                color="black"
                                onClick={nextButton}
                            >
                                ?????? ???????????? ???
                            </Button>
                        </ThemeProvider>
                    </>
                ):(undefined)}
            </div>
        </>
    )
}

export default Info