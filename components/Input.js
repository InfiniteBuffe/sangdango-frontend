import styles from '@/styles/components/Input/Input.module.css'
import cs from 'classnames'

const Input = (props) => {
    return (
        <>
            <div className={styles.box}>
                <div className={styles.label}>
                    {props.label}
                    &nbsp;
                    {props.required && (
                        <span id={styles.red}>*</span>
                    )}
                </div>
                <input
                    className={styles.input}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                />
            </div>
        </>
    )
}

export default Input