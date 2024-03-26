import { PrismaClient } from "@prisma/client"
import moment from "moment"
import 'moment-timezone'

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    if (req.body.name == undefined || typeof (req.body.studentId) == false) {
        return res
            .status(200)
            .json({
                code: 'NOT_ALLOWED',
            })
    }

    const currentRental = await client.CurrentRental.findMany({
        where: {
            name: req.body.name,
            studentId: Number(req.body.studentId)
        }
    })

    let isListed = (currentRental[0] != undefined) ? true : false

    if (isListed) {
        let remove = await client.CurrentRental.deleteMany({
            where: {
                name: req.body.name,
                studentId: Number(req.body.studentId)
            }
        })
        await client.rentalLog.create({
            data: {
                studentId: Number(studentId),
                type: '우산 대여 취소'
            }
        })
        const currentRentalCount = await client.CurrentRental.count()
        const _time = moment().tz("Asia/Seoul").format('HH시 mm분 ss초')
        res.status(200)
        res.json({
            code: 'RENTAL_CANCEL_COMPLETED',
            time: _time,
            max: 40,
            rental: currentRentalCount,
        })
    } else {
        res.status(404)
        res.json({
            code: 'NOT_REGISTERED'
        })
    }
}