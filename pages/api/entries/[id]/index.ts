import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { idRequest } from "../../../../api_request_functions/entries";
import { Entry } from "../../../../interfaces";


type Data = 
|{message: string} 
| Entry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {id}=req.query as {id:string};
    if ( !mongoose.isValidObjectId( id ) )  return res.status(400).json({message:`${id} No es un id valido`})
        
    switch (req.method) {
        case 'PUT':
            return idRequest.updateEntry(req, res);

        case 'GET':
            return idRequest.getEntry(req, res);

        case 'DELETE':
            return idRequest.deleteEntry(req, res);
            
            default:
                return res.status(200).json({ message: 'Ruta inexistente' });
            }
}

        

