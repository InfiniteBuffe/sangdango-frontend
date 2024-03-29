import { PrismaClient } from "@prisma/client"
import 'dayjs/locale/ko'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    if (req.query.studentId == null || req.query.studentId == '' || String(req.query.studentId).length != 5) {
        return res
            .status(200)
            .json({
                code: 'INCORRECT_STUDENT_ID'
            })
    }

    // 다른 곳에도 학번 검증하는 과정 추가할 것

    let sid = req.query.studentId

    // 학번은 5자리 고정
    if (String(sid).length != 5) {
        return res
            .status(200)
            .json({
                code: 'INCORRECT_STUDENT_ID'
            })
    }

    // 학번 유효성 검사 | 학년 검사
    if (String(sid)[0] == '0' || Number(String(sid)[0]) > 3) {
        return res
            .status(200)
            .json({
                code: 'INCORRECT_STUDENT_ID'
            })
    }

    // 학번 유효성 검사 | 반 검사
    if (Number(String(sid).slice(1, 3)) > 15 || Number(String(sid).slice(1, 3)) == 0) { // 반은 최대 15반까지
        return res
            .status(200)
            .json({
                code: 'INCORRECT_STUDENT_ID'
            })
    }

    // 학번 유효성 검사 | 번호 검사
    if (Number(String(sid).slice(3)) > 35 || Number(String(sid).slice(3)) == 0) { // 번호는 최대 35번까지
        return res
            .status(200)
            .json({
                code: 'INCORRECT_STUDENT_ID'
            })
    }

    const findRentalLog = await client.rentalLog.findMany({
        where: {
            studentId: Number(req.query.studentId)
        },
        select: {
            studentId: true,
            type: true,
            createdAt: true,
        }
    })

    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.tz.setDefault('Asia/Seoul')

    const date = (item) => dayjs(item.createdAt)
        .tz()
        .locale('ko')
        .format('YYYY[년] MM[월] DD[일] HH[시] mm[분] ss[초]')

    let setDateFormat = findRentalLog.map(item => ({
        ...item,
        createdAt: date(item),
    }))

    res
        .status(200)
        .json({
            code: 'INQUIRY_COMPLETED',
            data: setDateFormat
        })
    return
}