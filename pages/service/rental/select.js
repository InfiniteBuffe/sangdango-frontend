import { useRouter } from 'next/router'

const Select = () => {

    const url = (process.env.NEXT_PUBLIC_ENV == 'dev') ? (process.env.NEXT_PUBLIC_DEV_URL) : (process.env.NEXT_PUBLIC_PROD_URL)
    const router = useRouter()
    return (
        <>
            
        </>
    )
}

export default Select