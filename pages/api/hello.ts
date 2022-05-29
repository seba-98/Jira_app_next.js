// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok:boolean,
  message: string,
  method:string,
  secret:string,
}

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  
  
  return res.status(200).json({
    message: 'holaaa', 
    ok:true ,
    method:req.method || 'no hay metodo',
    secret:process.env.API_SECRET_KEY!
  })
  

}
