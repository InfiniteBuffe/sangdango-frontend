import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const client = new PrismaClient();

export default async function handler(req, res) {

    const allowedMethods = ['GET', 'PATCH']

    if (!allowedMethods.includes(req.method)) {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    const session = await getServerSession(req, res, authOptions)

    if (session == null) {
        res.status(401).send({ status: 401, message: 'Unauthorized' })
        return
    }

    if (!session.user.admin) {
        res.status(403).send({ status: 401, message: 'Forbidden' })
        return
    }

    if (req.method == 'GET') {
        let data = await client.currentRental.findMany({
            orderBy: {
                id: 'desc'
            },
        })
        res
            .status(200)
            .json(data)
        return
    }

    if (req.method == 'PATCH') {
        const { umbrellaName, notReturned, studentId } = req.body

        let data = {}

        if (umbrellaName != null) data.umbrellaName = umbrellaName
        if (notReturned != null) data.notReturned = notReturned

        if (Object.keys(data).length == 0) {
            res
                .status(200)
                .json({
                    code: 'NOT_CHANGED'
                })
            return
        }

        await client.currentRental.update({
            where: {
                studentId: Number(studentId)
            },
            data: data
        })

        res
            .status(200)
            .json({
                code: 'CHANGE_COMPLETED',
                data: {
                    ...data
                }
            })
        return
    }
}
