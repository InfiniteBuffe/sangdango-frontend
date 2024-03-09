import styles from '@/styles/pages/services/Rental/Add/Add.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Add = () => {
    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const [currentInfo, setCurrentInfo] = useState({ count: '-', time: '', max: '0', using: '0', })
    const [quantityStyleId, setQuantityStyleId] = useState()
    const [quantityState, setQuantityState] = useState()
    const router = useRouter()
    useEffect(() => {

        if(!router.isReady) return

        axios({
            url: url + '/api/rental/current',
            method: 'GET',
        })
            .then(r => {
                if (r.status != 200) {
                    setCurrentInfo({ ...currentInfo, count: 'none', time: r.data.time })
                    return
                }
                let data = { ...currentInfo, count: Number(r.data.max) - Number(r.data.count), time: r.data.time, max: r.data.max, using: r.data.count }
                setCurrentInfo(data)
                let quantityState = getNowCurrontCountState(data)
                setQuantityState(quantityState)
                switch (quantityState) {
                    case 'max':
                        return setQuantityStyleId()
                    case 'good':
                        return setQuantityStyleId(styles.success)
                    case 'warning':
                        return setQuantityStyleId(styles.warning)
                    case 'danger':
                        return setQuantityStyleId(styles.danger)
                }
            })
    }, [])

    const getNowCurrontCountState = (data) => {
        let max = Number(data.max)
        let using = Number(data.using)
        let rate = 100 - Math.round((using/max)*100)
        if (rate == 100) {
            return 'max'
        }
        if (rate < 100 && rate >= 60) {
            return 'good'
        }
        if (rate < 60 && rate >=30 ) {
            return 'warning'
        }
        if (rate < 30) {
            return 'danger'
        }
    }

    return (
        <>
            <div className={styles.now_quantity} id={quantityStyleId}>
                <div className={styles.title}>
                    <div className={styles.name}>
                        잔여 수량
                    </div>
                    <div className={styles.timestamp}>
                        {currentInfo.time} 기준
                    </div>
                </div>
                <div className={styles.quantity}>
                    {currentInfo.count == 'none' && (
                        <>대여불가</>
                    )}
                    {currentInfo.count != 'none' && (
                        <>{currentInfo.count}개</>
                    )}
                </div>
            </div>
        </>
    )
}

export default Add