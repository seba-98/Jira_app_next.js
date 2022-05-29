import type { NextApiRequest, NextApiResponse } from 'next'
import { IEntry } from '../../../models/Entry';
import { Entry } from '../../../interfaces/entry';
import { indexRequest } from '../../../api_request_functions/entries';

type Data = 
|{message: string} 
| IEntry[] 
| Entry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return indexRequest.getEntries( res );
        case 'POST':
            return indexRequest.newEntry( req, res );
    
        default:
            return res.status(400).json({ message: 'No existe la ruta' });
    }
}

