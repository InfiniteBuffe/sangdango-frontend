import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"
import dayjs from "dayjs"

const client = new PrismaClient()
const currentServices = ['RENTAL']

export default async function handler(req, res) {
    const method = req.method
    const allowedMethods = ['GET', 'PATCH']

    if (!allowedMethods.includes(method)) {
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

    if (method == 'PATCH') {

        const { service, name, value } = req.body

        if (!currentServices.includes(service)) { // 이건 꼭 해야하는지 잘 모르겠음
            res
                .status(200)
                .json({
                    code: 'SETTING_CHANGE_ERROR'
                })
            return
        }

        // name은 service가 달라도 중복되면 안됨

        const now = dayjs().add(9, 'hour').toDate()
        switch (name) {
            case 'RENTAL_APPLICATION':
            case 'RENTAL_MAX_UMBRELLA':
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

    if (method == 'GET') {

        // 로그인된 관리자만 설정 조회가능
        const name = Object.keys(req.query)
        let data = {}
        for (let i = 0; i < name.length; i++) {
            let find = await client.settings.findFirst({
                where: {
                    name: name[i],
                },
                select: {
                    value: true,
                }
            })
            if (find) {
                data[name[i]] = find.value
            } else {
                data[name[i]] = null
            }
        }

        return res.json(data)
    }
}