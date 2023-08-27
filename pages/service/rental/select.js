import Container from '@/components/Container'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from 'styles/pages/services/Rental/Select/Select.module.css'

const Select = () => {

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()
    const [data, setData] = useState([])
    const [tableData, setTableData] = useState()
    useEffect(() => {
        // if (!router.isReady) {
        //     return
        // }
        axios({
            url: url + '/api/rental/select',
            method: 'GET'
        })
            .then(r => {
                let _data = []
                let count = (r.data).length
                for (let i = 0; i <= count - 1; i++) {
                    _data.push(r.data[i])
                }
                setData(_data)
                let table = (
                    <>
                        {(_data).map((key, i) => {
                            return (
                                <tr key={i}>
                                    <td>{key.studentId}</td>
                                    <td>{key.name}</td>
                                </tr>
                            )
                        })}
                    </>
                )
                setTableData(table)
            })
    }, [])

    return (
        <>
            <Container>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>학번</th>
                            <th>이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </Container>
        </>
    )
}

export default Select