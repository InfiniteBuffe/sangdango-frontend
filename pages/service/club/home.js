import BottomNav from '@/components/BottomNav'
import ServiceHeader from '@/components/ServiceHeader'
import styles from '@/styles/pages/services/Club/Home/Home.module.css'

const Home = () => {
    return (
        <>
            <ServiceHeader title='동아리' service={'club'}/>
            <BottomNav service={'club'} />
        </>
    )
}

export default Home