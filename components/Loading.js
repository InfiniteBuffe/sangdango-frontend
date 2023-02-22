import styles from '@/styles/components/Loading/Loading.module.css'
import {PulseLoader} from "react-spinners";
import {useEffect, useState} from "react";

const Loading = (props) => {

    const [visible, setVisible] = useState(styles.remove)

    useEffect(()=>{
        if (props.visible) {
            setVisible()
        } else {
            setVisible(styles.remove)
        }
    }, [props.visible])

    return (
        <>
            <div class={visible}>
                <div className={styles.loading}>
                    <div className={styles.box}>
                        <div className={styles.loader}>
                            <PulseLoader color="#36d7b7" />
                        </div>
                        <div className={styles.text}>
                            잠시만 기다려주세요
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading