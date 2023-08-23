import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ status:405, message: 'Method Not Allowed' })
        return
    }

    const currentRental = await client.CurrentRental.findMany({})
    res
        .status(200)
        .json({
            status: 200,
            count: currentRental.length,
            max: 40, // 우산 최대 갯수
        })
}