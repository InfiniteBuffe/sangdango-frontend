import styles from '@/styles/components/Header/Header.module.css'
import { useState, useEffect } from 'react'
import Transition from 'react-transition-group/Transition'

const Header = (props) => {
    return (
        <>
            <div className={styles.header}>
                <div className={styles.title_box}>
                    <div className={styles.title}>여기는 <span className={styles.highlight}>상당</span>입니다.</div>
                </div>
            </div>
        </>
    )
}

export default Header