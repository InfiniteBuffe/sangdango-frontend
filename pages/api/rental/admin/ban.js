import {PrismaClient} from "@prisma/client"
import 'dayjs/locale/ko'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import {getServerSession} from "next-auth"
import {authOptions} from "pages/api/auth/[...nextauth]"

const client = new PrismaClient();

export default async function handler(req, res) {

    const allowedMethods = ['PATCH', 'GET']

    if (!allowedMethods.includes(req.method)) {
        res.status(405).send({status: 405, message: 'Method Not Allowed'})
        return
    }

    const session = await getServerSession(req, res, authOptions)

    if (session == null) {
        res.status(401).send({status: 401, message: 'Unauthorized'})
        return
    }

    if (!session.user.admin) {
        res.status(403).send({status: 401, message: 'Forbidden'})
        return
    }

    if (req.method === 'PATCH') {

        const {studentId, ban} = req.body
        let isBan = /true/.test(ban)
        let now = dayjs().toDate()
        let data = await client.rentalData.upsert({
            where: {
                studentId: Number(studentId),
            },
            update: {
                rentalBan: isBan,
                rentalBanLatestDate: now,
                updatedAt: now,
            },
            create: {
                studentId: Number(studentId),
                rentalBan: isBan,
                rentalBanLatestDate: now,
            }
        })

        await client.rentalLog.create({
            data: {
                studentId: Number(studentId),
                type: isBan ? '우산대여 신청 차단' : '우산대여 신청 차단해제'
            }
        })

        res
            .status(200)
            .json({
                code: 'RENTAL_BAN_COMPLETED'
            })
        return
    }

    if (req.method === 'GET') {
        const {studentId, all} = req.query

        dayjs.extend(utc)
        dayjs.extend(timezone)
        dayjs.tz.setDefault('Asia/Seoul')

        const date = (item) => dayjs(item)
            .tz()
            .locale('ko')
            .format('YYYY[년] MM[월] DD[일] HH[시] mm[분] ss[초]')


        if (/true/.test(all)) {
            let find = await client.rentalData.findMany({
                select: {
                    studentId: true,
                    rentalBan: true,
                    rentalBanLatestDate: true,
                    notReturnedCount: true,
                },
                where: {
                    rentalBan: true,
                }
            })
            let setDateFormat = find.map(item => ({
                ...item,
                rentalBanLatestDate: date(item.rentalBanLatestDate),
            }))
            res
                .status(200)
                .json({
                    code: 'PROCESSING_COMPLETED',
                    data: setDateFormat
                })
            return
        }

        if (String(studentId).length != 5) {
            res.status(200).json({
                code: 'NOT_FOUND'
            })
        }
        let find = await client.rentalData.findUnique({
            where: {
                studentId: Number(studentId),
            },
            select: {
                rentalBan: true,
                notReturnedCount: true,
                rentalBanLatestDate: true,
            }
        })
        if(!find) {
            res
                .status(200)
                .json({
                    code: 'PROCESSING_COMPLETED',
                    rentalBan: false,
                    notReturnedCount: 0,
                    rentalBanLatestDate: null,
                })
        }
        res
            .status(200)
            .json({
                code: 'PROCESSING_COMPLETED',
                data: {
                    rentalBan: find.rentalBan,
                    notReturnedCount: find.notReturnedCount,
                    rentalBanLatestDate: find.rentalBanLatestDate != null ? date(find.rentalBanLatestDate) : null
                }
            })
    }
}
