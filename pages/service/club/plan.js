import styles from '@/styles/pages/services/Club/Plan/Plan.module.css'
import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'

const Plan = (props) => {
    return (
        <>
            <ServiceHeader title='동아리' service={'club'}/>
            <BottomNav service={'club'} />
        </>
    )
}

export default Plan