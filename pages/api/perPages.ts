import { NextApiRequest, NextApiResponse } from "next";
import data from '../../data.json';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).json({"message":"Please send GET"})
    };

    const end = parseInt(req.query.p.toString()) * parseInt(req.query.showItems.toString())
    const start = (parseInt(req.query.p.toString()) - 1) * parseInt(req.query.showItems.toString())

    const response = {
        data: data.data.slice(start,end),
        totalData: data.totalData
    }

    if (req.query.showItems) {
        res.status(200).json(response)
    } else {
        res.status(200).json(data.data)
    }
}