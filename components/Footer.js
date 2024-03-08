import styles from 'styles/components/Footer/Footer.module.css'
import Container from './Container'

const Footer = () => {
    return (
        <>
            <div className={styles.space} />
            <div className={styles.footer}>
                <Container>
                    <div className={styles.text}>
                        운영: 상당고등학교 학생복지부
                        <br />
                        개발: 박태진
                        <br />
                        호스팅 서비스 제공: Vercel, Vultr, Cloudflare
                        <br />
                        <div className={styles.github}>
                            <a href='https://github.com/infinitebuffe/sangdango-frontend'>이 프로젝트</a>는 Github에 오픈소스로 공개되어 있습니다.
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Footer