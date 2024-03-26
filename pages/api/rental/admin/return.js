import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs";
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const client = new PrismaClient();

export default async function handler(req, res) {

    const allowedMethods = ['POST']

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

    if (req.method == 'POST') {
        const { studentId } = req.body

        const findRental = await client.currentRental.findUnique({
            where: {
                studentId: Number(studentId)
            }
        })

        if (!findRental) {
            res
                .status(200)
                .json({
                    code: 'NO_RENTAL'
                })
            return
        }

        await client.currentRental.delete({
            where: {
                studentId: Number(studentId)
            }
        })

        await client.rentalLog.create({
            data: {
                studentId: Number(studentId),
                type: '우산 반납 완료'
            }
        })

        res
            .status(200)
            .json({
                code: 'RETURN_COMPLETED',
            })
        return
    }
}
