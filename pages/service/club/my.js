import styles from '@/styles/pages/services/Club/My/My.module.css'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'

const My = (props) => {
    return (
        <>
            <ServiceHeader title='동아리' />
            <BottomNav service={'club'} />
        </>
    )
}

export default My