import styles from '@/styles/pages/auth/join/Info/Info.module.css'
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {useEffect, useState} from "react";
import { getCookies } from 'cookies-next';
import axios from "axios";
import {useRouter} from "next/router";

const Info = () => {

    const [loadingVisible, setLoadingVisible] = useState(true)

    const router = useRouter()

    useEffect(()=>{

        axios({
            url: '/api/verify/join/check',
            withCredentials: true,
        })
            .then(r=>{
                if(r.data.verify) {
                    setLoadingVisible(false)
                } else {
                    console.log(r.data)
                    router.push('/auth/join')
                }
            })
    }, [])

    return (
        <>
            <Header />
            <Loading visible={loadingVisible} />
        </>
    )
}

export default Info