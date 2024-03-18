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

    const isOpen = await client.settings.findFirst({
        where: {
            name: 'RENTAL_APPLICATION',
        },
        select: {
            value: true,
        }
    })

    if (Number(now[0]) == 8 && Number(now[1]) < 30) {
        return res
            .status(200)
            .json({
                code: 'NOT_RENTAL_TIME',
                message: '신청 가능 시간이 아닙니다.',
                open: isOpen.value
            })
    }
    if (Number(now[0]) == 19 && Number(now[1]) < 1) { // 19시 -> 오후 7시, 7시 00분 이후부터 거부
        return res
            .status(200)
            .json({
                code: 'NOT_RENTAL_TIME',
                message: '신청 가능 시간이 아닙니다.',
                open: isOpen.value
            })
    }
    if (Number(now[0]) < 8 || Number(now[0]) > 19) {
        return res
            .status(200)
            .json({
                code: 'NOT_RENTAL_TIME',
                message: '신청 가능 시간이 아닙니다.',
                open: isOpen.value
            })
    }

    if (!isOpen.value) {
        return res
            .status(200)
            .json({
                code: 'RENTAL_PAUSED',
                message: '일시적으로 중단되었습니다.',
                open: isOpen.value
            })
    }

    const currentRentalCount = await client.CurrentRental.count()

    // 가능 수량이 없음
    if (currentRentalCount == 40 || currentRentalCount > 40) { // 40개 이상 시 | 이후에 수량을 관리자 화면에서 수정할 수 있도록 변경할 것
        return res
            .status(200)
            .json({
                added: false,
                code: 'NOT_RENTAL_QUANTITY',
                message: '가능 수량이 없습니다.',
                open: isOpen.value
            })
    }

    let { name, studentId } = req.body

    if (name == undefined || name == '') {
        return res
            .status(200)
            .json({
                code: 'NOT_ALLOWED',
                added: false,
            })
    }
    if (studentId == undefined || studentId == '') {
        return res
            .status(200)
            .json({
                code: 'NOT_ALLOWED',
                added: false,
            })
    }
    if (name.length < 2 || name.length > 10) {
        return res
            .status(200)
            .json({
                code: 'NOT_ALLOWED',
                added: false,
            })
    }
    if (studentId.length != 5) {
        return res
            .status(200)
            .json({
                code: 'NOT_ALLOWED',
                added: false,
            })
    }

    let find = await client.currentRental.findUnique({
        where: {
            studentId: Number(studentId)
        }
    })

    if (find != null) {
        return res
            .status(200)
            .json({
                added: false,
                code: 'ALREADY_RENTED',
                message: '이미 등록되어있습니다.',
                open: isOpen.value
            })
    }

    await client.currentRental.create({
        data: {
            name: name,
            studentId: Number(studentId),
            umbrellaName: '',
        }
    })

    const _time = moment().tz("Asia/Seoul").format('HH시 mm분 ss초')

    return res
        .status(200)
        .json({
            added: true,
            max: 40, // 우산 최대 갯수
            rental: n + 1, // 처음 맨 위에 조회한 갯수 + 1
            CODE: 'RENTAL_COMPLETED',
            message: '등록이 완료되었습니다.',
            time: _time,
            open: isOpen.value
        })
}