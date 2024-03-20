import clientPromise from '@/app/lib/mango_db';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    try {
        const client = await clientPromise;
        const db = client.db("pfe");
        const movies = await db
            .collection("user")
            .find({})
            .sort({ metacritic: -1 })
            .limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
        return NextResponse.error();
    }
}