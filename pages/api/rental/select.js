import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ status:405, message: 'Method Not Allowed' })
        return
    }

    const currentRental = await client.CurrentRental.findMany({})
    let count = (currentRental).length
    let data = []
    for (let i=0;i<=count-1;i++) {
        let _d = currentRental[`${i}`]
        data.push({
            id: _d.id,
            date: _d.createdAt,
            studentId: _d.studentId,
            name: _d.name
        })
    }

    res
        .status(200)
        .json(data)
}