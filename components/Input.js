import styles from '@/styles/components/Input/Input.module.css'
import cs from 'classnames'

const Input = (props) => {
    return (
        <>
            <div className={props.bottomSheet ? styles.bottom_sheet_box : styles.box}>
                <div className={styles.label}>
                    {props.label}
                    &nbsp;
                    {props.required && (
                        <span id={styles.red}>*</span>
                    )}
                </div>
                <input
                    id={props.error ? styles.error : null}
                    className={styles.input}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                />
                {props.error && props.errorMsg == null && (
                    <div className={styles.error_text}>
                        입력 값을 확인해주세요.
                    </div>
                )}
                {props.error && props.errorMsg != null && (
                    <div className={styles.error_text}>
                        {props.errorMsg}
                    </div>
                )}
            </div>
        </>
    )
}

export default Input