import styles from 'styles/components/Footer/Footer.module.css'
import Container from './Container'

const Footer = () => {
    return (
        <>
            <div className={styles.space} />
            <div className={styles.footer}>
                <Container>
                    <div className={styles.text}>
                        운영: 상당고등학교 공간복지부
                        <br />
                        개발: 상당고등학교 박태진
                        <br />
                        호스팅 서비스 제공: Cloudflare, Amazon Web Service
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer