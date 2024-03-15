import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import dayjs from "dayjs"

const client = new PrismaClient()

export default async function handler(req, res) {
    const method = req.method

    if (method != 'PATCH') {
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

    const { service, name, value } = req.body

    const currentServices = ['RENTAL']

    if (!currentServices.includes(service)) {
        res
            .status(200)
            .json({
                code: 'SETTING_CHANGE_ERROR'
            })
        return
    }

    // name은 service가 달라도 중복되면 안됨

    switch (name) {
        case 'RENTAL_APPLICATION':
            let now = dayjs().add(9, 'hour').toDate()
            await client.settings.update({
                where: {
                    name: name
                },
                data: {
                    value: String(value),
                    updatedAt: now
                }
            })
            break

        default:
            res
                .status(200)
                .json({
                    code: 'SETTING_CHANGE_ERROR'
                })
            return
    }

    res
        .status(200)
        .json({
            code: 'SETTING_CHANGED_COMPLETED',
            setting: {
                service: service,
                name: name,
                value: value
            }
        })
    return
}