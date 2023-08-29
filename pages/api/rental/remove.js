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

    let isListed = (currentRental[0] != undefined) ? true : false

    if (isListed) {
        let remove = await client.CurrentRental.deleteMany({
            where: {
                name: req.body.name,
                studentId: Number(req.body.studentId)
            }
        })
        const currentRentalAll = await client.CurrentRental.findMany({})
        let n = currentRentalAll.length
        res.status(200)
        res.json({
            message: 'success',
            max: 40,
            rental: n,
        })
    } else {
        res.status(200)
        res.json({
            message: 'error'
        })
    }
}