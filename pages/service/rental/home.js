import Loading from '@/components/Loading'
import ServiceHeader from '@/components/ServiceHeader'
import styles from '@/styles/pages/services/Rental/Home/Home.module.css'
import axios from 'axios'
import Container from 'components/Container'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import Twemoji from 'react-twemoji'
import { useRouter } from 'next/router'
import ChannelTalk from '@/components/ChannelTalk'
import { TextField } from '@mui/material';
import PopupModal from '@/components/PopupModal'
import AlertBar from '@/components/AlertBar'

const Home = () => {

    const [currentCount, setCurrentCount] = useState('-')
    const [formOpen, setFormOpen] = useState(false)
    const [formSuccessOpen, setFormSuccessOpen] = useState(false)
    const [selectFormOpen, setSelectFormOpen] = useState(false)
    const [selectFormOpen2, setSelectFormOpen2] = useState(false)
    const [selectFormOpen3, setSelectFormOpen3] = useState(false)
    const [formInfo, setFormInfo] = useState({ studentId: '', name: '', agree: true }) // 나중에 약관 동의 체크 받을 것
    const [selectFormInfo, setSelectFormInfo] = useState({ studentId: '', name: '', time: '' })
    const [loading, setLoading] = useState(false)
    const [loginModalStatus, setLoginModalStatus] = useState(true)

    const router = useRouter()
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)

    useEffect(() => {
        axios({
            url: url + '/api/rental/current',
            method: 'GET',
        })
            .then(r => {
                if (r.status != 200) {
                    setCurrentCount(0)
                }
                setCurrentCount(Number(r.data.max) - Number(r.data.count))
            })
        if (router.isReady) {
            // ChannelTalk.boot({
            //     "pluginKey": "bf6065f9-c6b5-4270-8159-25ba0ff50f83",
            // });
        }
    }, [])

    const errorMsg = (text, options) => {
        toast.error(text, { ...options })
    }

    const apply = () => {
        let { name, studentId } = formInfo
        if (studentId == '' || studentId.length != 5) {
            return errorMsg('학번은 숫자 5자리 입니다.')
        }
        if (name == '' || name.length < 2) {
            return errorMsg('이름은 한/영 1~10글자 입니다.')
        }
        setLoading(true)
        axios({
            url: url + '/api/rental/add',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: formInfo.name,
                studentId: formInfo.studentId
            }
        })
            .then(r => {
                console.log(r.data)
                setFormInfo({ studentId: '', name: '', agree: true })
                setFormOpen(false)
                setLoading(false)
                if (!r.data.added) {
                    return toast.error(r.data.message)
                }
                setCurrentCount(Number(r.data.max) - Number(r.data.rental))
                toast.success('우산대여 신청이 완료되었습니다!')
                setFormOpen(false)
                setFormSuccessOpen(true)
                return
            })
            .catch(e => {
                setLoading(false)
                errorMsg('서버와 통신 중 오류가 발생하였습니다.')
                return
            })
    }


    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }

    const verifyName = (text) => {
        const t = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
        const n = /[0-9]/g;
        text = text.replace(t, '')
        text = text.replace(n, '')
        if (text.length > 10) {
            return text.substring(0, 10)
        }
        return text
    }

    const changeValue = (name, value, type, use) => {
        const data = (use == 'select') ? { ...selectFormInfo } : { ...formInfo }
        data[name] = value
        if (type == 'number') {
            data[name] = changeOnlyNum(value)
            let a = data[name]
            if (name == 'studentId' && a.length > 5) {
                return
            }
        }
        if (name == 'name') {
            data[name] = verifyName(value)
        }
        if (use == 'select') {
            setSelectFormInfo({ ...selectFormInfo, ...data })
        } else {
            setFormInfo({ ...formInfo, ...data })
        }
    }

    const selectStudent = () => {
        setLoading(true)
        axios({
            url: url + '/api/rental/find',
            method: 'POST',
            data: {
                studentId: Number(selectFormInfo.studentId),
                name: selectFormInfo.name
            }
        })
            .then(r => {
                let data = r.data
                if (data.message == 'error' || data.isListed == false) {
                    errorMsg('잘못된 정보입니다.')
                    setLoading(false)
                    return
                }
                setSelectFormInfo({ ...selectFormInfo, time: data.time })
                setSelectFormOpen(false)
                setLoading(false)
                setSelectFormOpen2(true)
            })
    }

    const cancleRental = () => {
        setLoading(true)
        axios({
            url: url + '/api/rental/remove',
            method: 'POST',
            data: {
                studentId: Number(selectFormInfo.studentId),
                name: selectFormInfo.name
            }
        })
            .then(r => {
                let data = r.data
                if (data.message == 'error') {
                    setLoading(false)
                    errorMsg('오류가 발생하였습니다.')
                    return
                }
                setLoading(false)
                setSelectFormOpen2(false)
                setSelectFormOpen3(true)
                setCurrentCount(Number(data.max) - Number(data.rental))
                setSelectFormInfo({ studentId: '', name: '', time: '' })
            })
            .catch(e => {
                setLoading(false)
                errorMsg('오류가 발생하였습니다.')
            })
    }

    return (
        <>
            <Loading visible={loading} text='서버와 통신 중' />
            <PopupModal
                open={loginModalStatus}
                cb={setLoginModalStatus}
                buttonText={'닫기'}
                title={'공지사항 📋'}
            >
                <div className={styles.notice_modal}>
                    - 현재 전산 준비 중으로 <span style={{color:'red', fontWeight:'700'}}>사용이 불가</span>합니다.
                    <br/>
                    - 3월 12일 화요일부터 사용이 가능합니다.
                </div>
            </PopupModal>
            {/* <AlertBar content='신청 시간은 오전 8시 ~ 오후 9시입니다.' /> */}
            <div className={styles.intro_text}>
                <div id={styles.intro_highlight}>우산대여,</div>온라인으로 간편하게!
            </div>
            <Container>
                <div className={styles.status}>
                    <div className={styles.status_flex}>
                        <div className={styles.status_title}>
                            가능 수량
                        </div>
                        <div className={styles.status_number}>
                            {currentCount}개
                        </div>
                        <div className={styles.status_message}>
                            <div className={styles.status_now_circle} />
                            <div className={styles.status_now_message}>
                                실시간 수량
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.warning}>
                    <span id={styles.warning_strong}>ⓘ 참고해주세요.</span><br />
                    - 실시간으로 현재 수량이 표시되나, 새로고침 해야 갱신됩니다.<br />
                    - 잘못된 학번으로 신청 시 불이익이 있을 수 있으니 확인해주세요.<br />
                    - 타인의 정보를 무단으로 이용 후 적발 시 이용정지 됩니다.<br />
                    - 반납은 익일 점심시간 반납을 원칙으로 합니다.<br />
                    - 이 외 자세한 사항은 전달된 공지사항을 확인해주세요.
                </div>
                {/* <div className={styles.button} onClick={() => setFormOpen(true)}>
                    <div className={styles.button_text}>
                        대여 신청하기
                    </div>
                </div>
                <div className={styles.select_button} onClick={() => setSelectFormOpen(true)}>
                    <div className={styles.button_text}>
                        대여 조회 / 취소
                    </div>
                </div> */}
                {/* <div className={styles.notice}>
                    신청은 오전 8시 30분부터 가능합니다.
                </div> */}
            </Container>
            <BottomSheet onDismiss={() => setSelectFormOpen(false)} className={styles.bottom_sheet} open={selectFormOpen}>
                <div className={styles.sheet_title}>
                    대여 조회 / 취소
                </div>
                <div className={styles.sheet_notice_mini}>
                    먼저, 대여하신 정보를 입력해주세요. ✏️
                </div>
                <TextField
                    helperText="예) 1학년 9반 32번 → 10932"
                    style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginTop: '20px' }}
                    fullWidth
                    label="학번"
                    variant="outlined"
                    inputProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    onChange={(a) => changeValue('studentId', a.target.value, 'number', 'select')}
                    value={selectFormInfo.studentId}
                />
                <TextField
                    style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginTop: '20px' }}
                    fullWidth label="이름"
                    variant="outlined"
                    inputProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    onChange={(a) => changeValue('name', a.target.value, 'text', 'select')}
                    value={selectFormInfo.name}
                />
                <div className={styles.sheet_button} onClick={() => { selectStudent() }}>
                    <div className={styles.sheet_button_text}>
                        다음으로
                    </div>
                </div>
            </BottomSheet>
            <BottomSheet onDismiss={() => setSelectFormOpen2(false)} className={styles.bottom_sheet} open={selectFormOpen2}>
                <div className={styles.sheet_title}>
                    대여 조회 및 취소
                </div>
                <div className={styles.sheet_notice_mini}>
                    아래 정보를 확인하시고, 취소 여부를 결정하세요.
                </div>
                <div className={styles.sheet_info_box}>
                    - 대여자: {selectFormInfo.name}<br />
                    - 학번: {selectFormInfo.studentId}<br />
                    - 신청한 시간: {selectFormInfo.time}
                </div>
                <div className={styles.sheet_button} id={styles.sheet_button_cancel} style={{ marginBottom: '-15px' }} onClick={() => cancleRental()}>
                    <div className={styles.sheet_button_text}>
                        대여를 취소할게요
                    </div>
                </div>
                <div className={styles.sheet_button} onClick={() => setSelectFormOpen2(false)}>
                    <div className={styles.sheet_button_text}>
                        닫기
                    </div>
                </div>
            </BottomSheet>
            <BottomSheet onDismiss={() => setFormOpen(false)} className={styles.bottom_sheet} open={formOpen}>
                <div className={styles.sheet_title}>
                    <Twemoji options={{ className: styles.emoji_font }}>☂</Twemoji>
                    &nbsp;대여 신청하기
                </div>
                <TextField
                    helperText="예) 1학년 9반 32번 → 10932"
                    style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginTop: '20px' }}
                    fullWidth
                    label="학번"
                    variant="outlined"
                    inputProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    onChange={(a) => changeValue('studentId', a.target.value, 'number')}
                    value={formInfo.studentId}
                />
                <TextField
                    style={{ width: 'calc(100% - 40px)', marginLeft: '20px', marginTop: '20px' }}
                    fullWidth label="이름"
                    variant="outlined"
                    inputProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: '500' } }}
                    onChange={(a) => changeValue('name', a.target.value)}
                    value={formInfo.name}
                />
                <div className={styles.sheet_button} onClick={apply}>
                    <div className={styles.sheet_button_text}>
                        신청하기
                    </div>
                </div>
            </BottomSheet>
            <BottomSheet onDismiss={() => setFormSuccessOpen(false)} className={styles.bottom_sheet} open={formSuccessOpen}>
                {/* <div className={styles.sheet_title}>
                    <Twemoji options={{ className: styles.emoji_font }}>☂</Twemoji>
                    &nbsp;대여 신청하기
                </div> */}
                <div className={styles.sheet_container}>
                    <div className={styles.sheet_notice}>
                        <Twemoji options={{ className: styles.emoji_font }}>✔️</Twemoji>
                        신청이 완료되었습니다.
                    </div>
                    <div className={styles.sheet_notice_mini}>
                        장소: 3층 학생회실<br />
                        대여 시간: 대여 당일 16:40-16:50<br />
                        반납 시간: 대여 다음날 13:15~13:25<br />
                    </div>
                </div>
                <div className={styles.sheet_button} onClick={() => setFormSuccessOpen(false)}>
                    <div className={styles.sheet_button_text}>
                        닫기
                    </div>
                </div>
            </BottomSheet>
            <BottomSheet onDismiss={() => setSelectFormOpen3(false)} className={styles.bottom_sheet} open={selectFormOpen3}>
                {/* <div className={styles.sheet_title}>
                    <Twemoji options={{ className: styles.emoji_font }}>☂</Twemoji>
                    &nbsp;대여 신청하기
                </div> */}
                <div className={styles.sheet_container}>
                    <div className={styles.sheet_notice}>
                        <Twemoji options={{ className: styles.emoji_font }}>✔️</Twemoji>
                        취소가 완료되었습니다.
                    </div>
                    <div className={styles.sheet_info_box}>
                        - 신청 시간내 재신청이 가능하오니 참고해주세요.<br />
                        - 이용해주셔서 감사합니다.
                    </div>
                </div>
                <div className={styles.sheet_button} onClick={() => setSelectFormOpen3(false)}>
                    <div className={styles.sheet_button_text}>
                        닫기
                    </div>
                </div>
            </BottomSheet>
        </>
    )
}

export default Home