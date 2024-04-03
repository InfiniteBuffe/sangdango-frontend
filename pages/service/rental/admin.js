import BottomSheetContainer from '@/components/BottomSheetContainer'
import BottomSheetTitle from '@/components/BottomSheetTitle'
import Input from '@/components/Input'
import MuiButton from '@/components/MuiButton'
import styles from '@/styles/pages/services/Rental/Admin/Admin.module.css'
import { FormControlLabel, Switch, styled } from '@mui/material'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from "next-auth/next"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdError } from "react-icons/md"
import { BottomSheet } from 'react-spring-bottom-sheet'

const Admin = (props) => {

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()

    const [bottomSheetStatus, setBottomSheetStatus] = useState({ maxQuantity: false })
    const [bottomSheetData, setBottomSheetData] = useState({ maxQuantity: {} })

    const [data, setData] = useState({ maxQuantity: { now: '', value: '', error: false, errorMsg: '값을 입력해주세요' } })

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
                    <div onClick={() => router.push(`/auth/login?redirect=${url}/service/rental/admin`)} className={styles.login_button} >
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

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }))

    useEffect(() => {
        if (!router.isReady) return

        axios({
            method: 'GET',
            url: url + '/api/rental/setting',
            params: {
                RENTAL_APPLICATION: '',
                RENTAL_MAX_UMBRELLA: '',
            },
            withCredentials: true,
        })
            .then(r => {
                setSettings(data => ({
                    ...data,
                    RENTAL_APPLICATION: JSON.parse(r.data.RENTAL_APPLICATION),
                    RENTAL_MAX_UMBRELLA: r.data.RENTAL_MAX_UMBRELLA
                }))
            })
    }, [router.isReady])

    const [settings, setSettings] = useState({
        RENTAL_APPLICATION: false,
        RENTAL_MAX_UMBRELLA: 0,
    })

    const changeSetting = (name, value) => {
        let promise = axios({
            method: 'PATCH',
            url: url + '/api/rental/setting',
            data: {
                service: 'RENTAL',
                name: name,
                value: value,
            },
            withCredentials: true,
        })
            .then(r => {
                if (r.data.code == 'SETTING_CHANGED_COMPLETED') {
                    let _settings = settings
                    _settings[name] = value
                    setSettings({ ..._settings })
                    return
                }
            })

        toast.promise(
            promise,
            {
                loading: '저장 중...',
                success: '설정이 저장되었습니다',
                error: '오류가 발생했습니다',
            }
        )
    }

    const changeOnlyNum = (text) => {
        let regex = /[^0-9]/g
        let result = text.replace(regex, '')
        return result
    }

    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    관리 ⚙️
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                changeSetting('RENTAL_APPLICATION', !settings.RENTAL_APPLICATION)
            }}>
                <div className={styles.setting_text}>
                    우산대여 신청 받기
                </div>
                <FormControlLabel
                    control={<IOSSwitch className={styles.switch} />}
                    labelPlacement="start"
                    checked={settings.RENTAL_APPLICATION}
                />
            </div>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/list')
            }}>
                <div className={styles.setting_text}>
                    대여자 명단 보기
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/return')
            }}>
                <div className={styles.setting_text}>
                    우산반납 등록
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                setBottomSheetStatus(data => ({ ...data, maxQuantity: true }))
            }}>
                <div className={styles.setting_text}>
                    우산수량 변경
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.box} onClick={() => {
                router.push('/service/rental/admin/ban')
            }}>
                <div className={styles.setting_text}>
                    대여금지 학번 관리
                </div>
                <div className={styles.setting_text}>
                    →
                </div>
            </div>
            <div className={styles.bottom_space} />

            <BottomSheet open={bottomSheetStatus.maxQuantity}>
                <BottomSheetContainer>
                    <BottomSheetTitle
                        title='우산 최대수량 변경'
                        description='우산 대여 가능 수량을 변경합니다. 최솟값은 0, 최댓값은 999 입니다.'
                    />
                    <div className={styles.bottom_sheet_notice}>
                        현재 설정된 최대 수량은 <span style={{color: 'blue'}}>{settings.RENTAL_MAX_UMBRELLA}</span>개 입니다.
                    </div>
                    <Input
                        label='최대 수량'
                        required={true}
                        bottomSheet={true}
                        onChange={e => {
                            let _data = String(changeOnlyNum(e.target.value))
                            if (_data.length > 3) return
                            setData(data => ({ ...data, maxQuantity: { ...data.maxQuantity, value: _data } }))
                        }}
                        value={data.maxQuantity.value}
                        error={data.maxQuantity.error}
                        errorMsg={data.maxQuantity.errorMsg}
                    />
                    <MuiButton
                        bottomSheet={true}
                        onClick={() => {
                            if (String(data.maxQuantity.value).length == 0) {
                                setData(data=>({...data, maxQuantity: { ...data.maxQuantity, error: true }}))
                                return
                            }
                            setData(data=>({...data, maxQuantity: { ...data.maxQuantity, error: false }}))
                            changeSetting('RENTAL_MAX_UMBRELLA', String(data.maxQuantity.value))
                            setBottomSheetStatus(data => ({ ...data, maxQuantity: false }))
                            setData(data=>({...data, maxQuantity: { ...data.maxQuantity, value: '' }}))
                        }}
                    >
                        수량 변경하기
                    </MuiButton>
                    <MuiButton
                        onClick={() => setBottomSheetStatus(data => ({ ...data, maxQuantity: false }))}
                        bottomSheet={true}
                        style={{ backgroundColor: 'rgb(160, 20, 0)', marginTop: '10px' }}
                    >
                        취소 및 닫기
                    </MuiButton>
                </BottomSheetContainer>
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

export default Admin