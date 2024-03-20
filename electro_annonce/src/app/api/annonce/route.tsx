import { NextApiRequest, NextApiResponse } from 'next';

export async function get(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Logique pour la méthode GET
        res.status(200).json({ message: 'GET request handled!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

