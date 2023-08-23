import Container from '@/components/Container'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'

const Select = () => {

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()
    const [data, setData] = useState([])
    const [tableData, setTableData] = useState(<tr></tr>)
    useEffect(() => {
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
                setTableData(
                    <>
                        {(data).map((key) => {
                            <tr>
                                <td>{key.studentId}</td>
                                <td>{key.namn}</td>
                            </tr>
                        })}
                    </>
                )
            })
    }, [])

    return (
        <>
            <Container>
                <table>
                    <th>학번</th>
                    <th>이름</th>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </Container>
        </>
    )
}

export default Select