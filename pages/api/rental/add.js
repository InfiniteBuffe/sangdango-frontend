import { PrismaClient } from "@prisma/client";
import moment from 'moment'
import 'moment-timezone'

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    const time = moment().tz("Asia/Seoul").format('HH:mm:ss');
    let now = time.split(':')



    if (Number(now[0]) == 8 && Number(now[1]) < 30) {
        return res
            .status(200)
            .json({
                status: 200,
                message: '신청 가능 시간이 아닙니다.'
            })
    }
    if (Number(now[0]) == 19 && Number(now[1]) < 1) { // 19시 -> 오후 7시, 7시 00분 이후부터 거부
        return res
            .status(200)
            .json({
                status: 200,
                message: '신청 가능 시간이 아닙니다.'
            })
    }
    if (Number(now[0]) < 8 || Number(now[0]) > 19) {
        return res
            .status(200)
            .json({
                status: 200,
                message: '신청 가능 시간이 아닙니다.'
            })
    }


    const currentRental = await client.CurrentRental.findMany({})
    let n = currentRental.length

    // 가능 수량이 없음
    if (n == 30) {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
                message: '가능 수량이 없습니다.'
            })
    }

    let { name, studentId } = req.body

    if (name == undefined || name == '') {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
            })
    }
    if (studentId == undefined || studentId == '') {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
            })
    }
    if (name.length < 2 || name.length > 10) {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
            })
    }
    if (studentId.length != 5) {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
            })
    }

    let find = await client.currentRental.findFirst({
        where: {
            studentId: Number(studentId)
        }
    })

    if (find != null) {
        return res
            .status(200)
            .json({
                status: 200,
                added: false,
                message: '이미 등록되어있습니다.'
            })
    }

    await client.currentRental.create({
        data: {
            name: name,
            studentId: Number(studentId)
        }
    })

    return res
        .status(200)
        .json({
            status: 200,
            added: true,
            max: 40, // 우산 최대 갯수
            rental: n+1, // 처음 맨 위에 조회한 갯수 + 1
            message: '등록이 완료되었습니다.'
        })
}