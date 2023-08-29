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
    const formatDateTime = (dateTimeString) => {
        var date = new Date(dateTimeString);
        if (process.env.NEXT_PUBLIC_ENV == "prod") {
            var formattedDateTime =
                date.getFullYear() + "년 " +
                (date.getMonth() + 1) + "월 " +
                date.getDate() + "일 " +
                (date.getHours() + 9) + "시 " +
                date.getMinutes() + "분 " +
                date.getSeconds() + "초";
        }
        var formattedDateTime =
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