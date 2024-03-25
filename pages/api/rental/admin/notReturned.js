import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs";
import { getServerSession } from "next-auth"
import { authOptions } from "pages/api/auth/[...nextauth]"

const client = new PrismaClient();

export default async function handler(req, res) {

    const allowedMethods = ['POST', 'GET']

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

        const { studentId } = req.query
        let data = await client.rentalData.findUnique({
            where: {
                studentId: Number(studentId),
            }
        })

        if (!data) {
            let _data = await client.rentalData.create({
                data: {
                    studentId: Number(studentId),
                }
            })

            res
                .status(200)
                .json(_data)
            return
        }

        res
            .status(200)
            .json(data)
        return

    }

    if (req.method == 'POST') {
        const { studentId } = req.body

        // 장기미반납 요청 시, 학번 데이터에 1회 장기미반납 추가 및 현재 대여 목록에 장기미반납 여부 표시

        await client.currentRental.update({
            where: {
                studentId: Number(studentId)
            },
            data: {
                notReturned: true,
            }
        })

        await client.rentalLog.create({
            data: {
                studentId: studentId,
                type: '우산대여 장기 미반납'
            }
        })

        let now = dayjs().add(9, 'hour').toDate()
        let setStudentRentalData = await client.rentalData.upsert({
            where: {
                studentId: Number(studentId)
            },
            update: {
                updatedAt: now,
                notReturnedCount: {
                    increment: 1,
                }
            },
            create: {
                studentId: studentId,
                notReturnedCount: 1,
            }
        })

        res
            .status(200)
            .json({
                code: 'CHANGE_COMPLETED',
                data: {
                    notReturned: true,
                    notReturnedCount: setStudentRentalData.notReturnedCount,
                }
            })
        return
    }
}
