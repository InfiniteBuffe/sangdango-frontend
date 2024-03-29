const { default: Twemoji } = require("react-twemoji")

const TwemojiFix = (props) => {
    return (
        <>
            <Twemoji options={{...props.options, base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/'}}>
                {props.children}
            </Twemoji>
        </>
    )
}

export default TwemojiFix