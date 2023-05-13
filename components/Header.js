import styles from '@/styles/components/Header/Header.module.css'
import { useState, useEffect } from 'react'

const Header = (props) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title_box}>
                    <div className={styles.title}><span className={styles.highlight}>상당고</span>&nbsp;학생정보망</div>
                </div>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default Header