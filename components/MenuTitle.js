import styles from '@/styles/components/MenuTitle/MenuTitle.module.css'

const MenuTitle = (props) => {

    return (
        <>
            <div className={styles.page_title}>
                <div className={styles.text}>
                    {props.text}
                </div>
                {props.description && (
                    <div className={styles.description}>
                        {props.description}
                    </div>
                )}
            </div>
        </>
    )
}

export default MenuTitle