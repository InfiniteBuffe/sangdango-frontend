import styles from '@/styles/pages/services/Club/View/View.module.css'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'

const View = (props) => {
    return (
        <>
            <ServiceHeader title='동아리' />
            <BottomNav service={'club'} />
        </>
    )
}

export default View