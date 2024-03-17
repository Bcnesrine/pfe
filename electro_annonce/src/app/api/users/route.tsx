import clientPromise from "@/app/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        let client = await clientPromise
        client.db("sample_mflix")
            .collection("users")
            .find()
            .sort(-1)
            .toArray()
    } catch (error) {

    }


}