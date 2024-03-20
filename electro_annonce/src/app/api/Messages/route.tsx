import { NextApiRequest, NextApiResponse } from 'next';
import Message, { IMessage } from '@/app/models/MessagesModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const messages: IMessage[] = await Message.find({});
            res.status(200).json(messages);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { content, author } = req.body;
            const message: IMessage = new Message({ content, author });
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}



