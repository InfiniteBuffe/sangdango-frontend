import jwt from 'jsonwebtoken'

export const config = {
    runtime: "edge",
    unstable_allowDynamic: [
        '**/node_modules/lodash/_root.js', // use a glob to allow anything in the function-bind 3rd party module
    ],
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    const body = req.body
    if (body.terms_agree && body.privacy_agree) {
        const jwt_data = {
            terms_agree: true,
            privacy_agree: true,
        }
        const token = await jwt.sign(jwt_data, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '10s',
            issuer: 'sangdango.kr',
        })
        const data = {
            status: 'success',
            token: token
        }
        await res.status(200).json(data)
    }
}
