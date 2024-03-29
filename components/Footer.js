import styles from 'styles/components/Footer/Footer.module.css'
import Container from './Container'

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                {/* <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td className={styles.name}>운영</td>
                                <td className={styles.value}>상당고등학교 학생자치회 학생복지부</td>
                            </tr>
                            <tr>
                                <td className={styles.name}>개발</td>
                                <td className={styles.value}>상당고등학교 25회 졸업생 박태진</td>
                            </tr>
                            <tr>
                                <td className={styles.name}>호스팅서비스제공</td>
                                <td className={styles.value}>Vercel, Vultr, Cloudflare</td>
                            </tr>
                            <tr>
                                <td className={styles.project} colSpan={2}>
                                    <a href='https://github.com/infinitebuffe/sangdango-frontend'>이 프로젝트</a>는 Github에 오픈소스로 공개되어 있습니다.
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                <div className={styles.text}>
                    운영: 상당고등학교 학생자치회 학생복지부
                    <br />
                    개발: 상당고등학교 25회 졸업생 박태진
                    <br />
                    호스팅 서비스 제공: Vercel, Vultr, Cloudflare
                    <br />
                    <div className={styles.github}>
                        <a href='https://github.com/infinitebuffe/sangdango-frontend'>이 프로젝트</a>는 Github에 오픈소스로 공개되어 있습니다.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer