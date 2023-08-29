import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ status: 405, message: 'Method Not Allowed' })
        return
    }

    if (req.body.name == undefined || req.body.name == undefined || typeof (req.body.studentId) == false) {
        return res
            .status(200)
            .json({
                message: 'error'
            })
    }

    const currentRental = await client.CurrentRental.findMany({
        where: {
            name: req.body.name,
            studentId: Number(req.body.studentId)
        }
    })

    const convertUTCtoKST = (utcDate) => {
        let kstDate = new Date(utcDate);
        kstDate.setHours(kstDate.getHours() + 9)
        if (kstDate.getUTCHours() >= 24) {
            kstDate.setDate(kstDate.getDate() + 1)
        }
        return kstDate
    }

    const formatDateTime = (dateTimeString) => {
        // 서버에서는 시간이 다름.
        let date = convertUTCtoKST(dateTimeString);
        let formattedDateTime =
            date.getFullYear() + "년 " +
            (date.getMonth() + 1) + "월 " +
            date.getDate() + "일 " +
            date.getHours() + "시 " +
            date.getMinutes() + "분 " +
            date.getSeconds() + "초";
        return formattedDateTime;
    }

    let data = {
        message: 'success',
        isListed: (currentRental[0] != undefined) ? true : false,
    }
    if (data.isListed) {
        data.time = formatDateTime(currentRental[0].createdAt)
    }
    res
        .status(200)
        .json(data)
}