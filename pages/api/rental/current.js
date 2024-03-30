import { PrismaClient } from "@prisma/client";
import moment from 'moment'
import 'moment-timezone'

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    const time = moment().tz("Asia/Seoul").format('HH시 mm분 ss초')
    const currentRental = await client.CurrentRental.findMany({})
    const RENTAL_MAX_UMBRELLA = await client.settings.findFirst({
        where: {
            name: 'RENTAL_MAX_UMBRELLA',
        },
        select: {
            value: true,
        }
    })
    const RENTAL_APPLICATION = await client.settings.findFirst({
        where: {
            name: 'RENTAL_APPLICATION',
        },
        select: {
            value: true,
        }
    })
    let remaining = Number(RENTAL_MAX_UMBRELLA.value) - Number(currentRental.length)
    res
        .status(200)
        .json({
            count: currentRental.length, // 현재 대여 우산 갯수
            max: Number(RENTAL_MAX_UMBRELLA.value), // 우산 최대 갯수
            time: time,
            open: RENTAL_APPLICATION.value, // 신청 가능 여부
            remaining: remaining < 0 ? 0 : remaining
        })
}