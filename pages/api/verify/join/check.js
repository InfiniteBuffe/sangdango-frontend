import jwt from 'jsonwebtoken'

export const config = {
    runtime: 'edge',
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }
    const data = {
        status: 'success',
        verify: false,
    }
    const cookie = req.cookies
    jwt.verify(cookie.join_token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) {
            data.verify = true
        } else {
            data.msg = cookie
        }
    })
    await res.status(200).json(data)
}
