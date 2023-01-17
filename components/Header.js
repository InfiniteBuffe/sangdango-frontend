import styles from '@/styles/components/Header/Header.module.css'
import { useState, useEffect } from 'react'

const Header = (props) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title_box}>
                    <div className={styles.title}>여기는 <span className={styles.highlight}>상당</span>입니다.</div>
                </div>
            </div>
            <div className={styles.header_space} />
        </>
    )
}

export default Header