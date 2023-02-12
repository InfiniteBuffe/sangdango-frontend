import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const Test = () => {

    // const [menuToggle, setMenuToggle] = useState(false);
    const { data: session, status } = useSession();
    const [view, setView] = useState(<>
        status: {status}<br />
        session: {JSON.stringify(session)}
    </>);

    useEffect(() => {
        setView(<>
            status: {status}<br />
            session: {JSON.stringify(session)}
        </>)
    }, [status])

    console.log(`session: ${JSON.stringify(session)} | status: ${status}`)
    return (
        <>
            {view}
        </>
    )
}

export default Test