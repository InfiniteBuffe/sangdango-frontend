import styles from '@/styles/components/Input/Input.module.css'
import cs from 'classnames'

const Input = (props) => {
    return (
        <>
            <input className={cs(styles.input, props.classNames)} {...props} />
        </>
    )
}

export default Input